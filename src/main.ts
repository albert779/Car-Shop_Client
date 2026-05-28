
// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { MaterialModule } from './app/shared/material.module';

import { loadingInterceptor } from './interceptors/loading.interceptor';
import { apiBaseUrlInterceptor } from './interceptors/api-base-url.interceptor';
import { AuthInterceptor } from './interceptors/auth-interceptor'; // functional

bootstrapApplication(AppComponent, {
  providers: [
    // Router
    provideRouter(routes),

    // HttpClient with interceptors
    provideHttpClient(
      withInterceptors([
        loadingInterceptor,
        apiBaseUrlInterceptor,
        AuthInterceptor, // ✅ attach token to requests
      ])
    ),

    // Angular Material & Browser Animations
    importProvidersFrom(
      BrowserAnimationsModule,
      MaterialModule
    )
  ]
}).catch(err => console.error(err));