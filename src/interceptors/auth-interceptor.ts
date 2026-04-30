import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage';
import { inject } from '@angular/core/primitives/di';



export const AuthInterceptor = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
   const storage = inject(LocalStorageService);
  const token = storage.getValueFromStore('token');

  if (token) {
    const clonedRequest = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next(clonedRequest);
  }

  return next(req);
};
