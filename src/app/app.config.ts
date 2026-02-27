import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from '../interceptors/loading.interceptor';
import { apiBaseUrlInterceptor } from '../interceptors/api-base-url.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideHttpClient({
    //   withInterceptors([LoaderInterceptor])
    // })
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([loadingInterceptor, apiBaseUrlInterceptor]))
    ]
};


