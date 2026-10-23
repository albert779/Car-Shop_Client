

/*
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {  provideAnimations} from '@angular/platform-browser/animations';

import {
  provideHttpClient,
  withInterceptorsFromDi
} from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [
     provideAnimations(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    

    // enable interceptors from DI
    provideHttpClient(withInterceptorsFromDi()),

 
    
  ]
};
*/

import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';

import { routes } from './app.routes';
//import { AuthInterceptor } from './path-to-your-auth-interceptor';
import { AuthInterceptor } from '../interceptors/auth-interceptor';
//import { apiBaseUrlInterceptor } from './path-to-your-api-base-url-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    provideHttpClient(
      withInterceptors([
        //apiBaseUrlInterceptor,
        AuthInterceptor
      ])
    )
  ]
};