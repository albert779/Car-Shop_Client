import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../app/auth/auth';
import { LocalStorageService } from '../local-storage/local-storage';

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

  // 🔐 Role check (optional)
  const requiredRole = route.data?.['role'];
  

  

  return true;
};