import {
    HttpErrorResponse,
    HttpInterceptorFn
} from '@angular/common/http';

import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../app/shared/services/notification';
import { ErrorMessageResolverService } from '../app/shared/services/ErrorMessageResolverService';


export const notificationInterceptor: HttpInterceptorFn = (req, next) => {

    const notification = inject(NotificationService);
    const errorMessageResolverService = inject(ErrorMessageResolverService);

    return next(req).pipe(


       catchError((error: HttpErrorResponse) => {

            const errorMessage = errorMessageResolverService.getErrorMessage(error);
            notification.error(errorMessage);
            return throwError(() => error);

        })

    );

};


