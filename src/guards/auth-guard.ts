import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage';
import { AuthService } from '../services/auth.service';



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
    return false;
  }


  const requiredRoleName = route.data?.['role'];

  if (!requiredRoleName) {
    return true;
  }

  const user = authService.getUser();

  // no use but has role to check
  if (user == null) {
    router.navigate(['/login']);
    return false;
  }
  debugger;
  if (user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] !== requiredRoleName) {
    router.navigate(['/unauthorized']);
    return false;
  }


  return true;
};


