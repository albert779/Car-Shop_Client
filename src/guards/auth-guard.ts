import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../app/auth/auth';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
   debugger;
  const auth = inject(AuthService);
  const router = inject(Router);

  // ✅ Get token from localStorage
  const token = auth.getToken();
  const redirectUrl = state.url;

  debugger;
  localStorage.setItem('redirectUrl',redirectUrl);

  if (!token) {
    debugger;
     // 🚪 redirect to login
      router.navigate(['/login']);
      return false;
  }
  //// check  pemission to the page
  return true;
};
