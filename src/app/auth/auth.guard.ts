import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // ✅ Get token from localStorage
  const token = auth.getToken();

  console.log('🔐 AuthGuard check, token =', token);

  /*
  // ✅ Allow access only if token exists
  if (token) {
    return true;
  }

  // ❌ Not logged in → redirect to login
  return router.createUrlTree(['/login']);
  */
  if (!token) {
    auth.logout(); // automatically delete any existing token
    return router.createUrlTree(['/login']);
  }
  return true;
};