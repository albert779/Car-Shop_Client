
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { MaterialModule } from './app/car/modules/material.module';

import { loadingInterceptor } from './interceptors/loading.interceptor';
import { authInterceptor } from './interceptors/auth-interceptor';
import { apiBaseUrlInterceptor } from './interceptors/api-base-url.interceptor';
import { forbiddenInterceptor } from './interceptors/forbidden-interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),

    provideHttpClient(
      withInterceptors([
        apiBaseUrlInterceptor,   // 1️⃣ add base URL first
        authInterceptor,         // 2️⃣ attach token
        loadingInterceptor,      // 3️⃣ handle loading UI,
        forbiddenInterceptor,
      ])
    ),

    importProvidersFrom(
      BrowserAnimationsModule,
      MaterialModule
    )
  ]
})
.catch(err => console.error(err));

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
  ]
});
