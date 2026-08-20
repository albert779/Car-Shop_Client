import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../app/auth/auth';
import { LocalStorageService } from '../services/local-storage';


const roleKey = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const storage = inject(LocalStorageService);
  const authService = inject(AuthService);
  const REDIRECT_URL_KEY = 'redirectUrl';



  const token = authService.getToken();
  const url = state.url;
  // 🚪 Not logged in → go to login
  if (!token) {
    storage.setValueInStore(REDIRECT_URL_KEY, url);
    router.navigate(['/login']);
    //return router.createUrlTree(['/login']);
    return false;
  }

  const skip = !route.data['role'];
  if (skip) {
    return true;
  }

  const requiredRole = route.data?.['role'];
  const userRole = authService.getUserRole(roleKey);
  const isCorrectRole = userRole === requiredRole;

  if (!isCorrectRole) {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};


