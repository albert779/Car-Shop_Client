import { inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const forbiddenInterceptor: HttpInterceptorFn =
  (req: HttpRequest<unknown>, next: HttpHandlerFn) => {

    const router = inject(Router);

    return next(req).pipe(
      catchError((error: HttpErrorResponse) => {

        debugger;
        if (error.status === 403) {
          router.navigate(['/unauthorized']); // ✅ no "this"
        }

        return throwError(() => error);
      })
    );
};


// export const LoginInterceptor: HttpInterceptorFn =
//   (req: HttpRequest<unknown>, next: HttpHandlerFn) => {

//     const router = inject(Router);

//     return next(req).pipe(
//       catchError((error: HttpErrorResponse) => {

//         debugger;
//         if (error.status === 401) {
//           router.navigate(['/login']); // ✅ no "this"
//         }

//         return throwError(() => error);
//       })
//     );
// };