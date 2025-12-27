import { loadingInterceptor } from './interceptors/loading.interceptor';
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { MaterialModule } from './app/car/modules/material.module';
import { routes } from './app/app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//import { loadingInterceptor } from './app/interceptors/loading.interceptor';
import { apiBaseUrlInterceptor } from './interceptors/api-base-url.interceptor'; 

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([loadingInterceptor,apiBaseUrlInterceptor])
    ),
    importProvidersFrom(
      BrowserAnimationsModule,
      MaterialModule
    )
  ]
}).catch(err => console.error(err));


