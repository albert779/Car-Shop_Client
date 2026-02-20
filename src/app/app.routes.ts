


import { Routes } from '@angular/router';
import { CarListComponent } from './car/car-list.component/car-list.component';
import { TruckListComponent } from './truck/truck-list.component/truck-list.component';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { authGuard } from '../guards/auth-guard';
import { NotFoundComponent } from '../not-found/not-found';
import { UnauthorizedComponent } from '../unauthorized/unauthorized';
//import { UnauthorizedComponent } from '../unauthorized/unauthorized.ts';

/*

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // 👉 Cars page
  { path: 'cars', component: CarListComponent,canActivate: [authGuard] },

  // 👉 Trucks page
  { path: 'trucks', component: TruckListComponent,canActivate: [authGuard] },

  {
    path: '',redirectTo: 'cars',pathMatch: 'full'},

  // 👉 Optional: 404 handling
  { path: '**', redirectTo: 'cars' },

  {
    path: 'unauthorized',component: UnauthorizedComponent
  },

   {
  path: 'admin',
  canActivate: [authGuard],
  loadComponent: () =>
    import('./admin/admin').then(m => m.AdminComponent)
}
];



export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // 👉 Cars page
  {
    path: 'cars',
    component: CarListComponent,
    canActivate: [authGuard]
  },

  // 👉 Trucks page
  {
    path: 'trucks',
    component: TruckListComponent,
    canActivate: [authGuard]
  },

  // 👉 Admin page (lazy + protected)
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./admin/admin').then(m => m.AdminComponent)
  },

  // 👉 Unauthorized page (NO guard!)
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('../unauthorized/unauthorized')
        .then(m => m.UnauthorizedComponent)
  },

  { path: '**', component: NotFoundComponent },

  // 👉 Default
  { path: '', redirectTo: 'cars', pathMatch: 'full' },

  // 👉 404 (MUST BE LAST)
  { path: '**', redirectTo: 'cars' }
];

*/

/*
export const routes: Routes = [
  // Auth routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Protected pages
  { path: 'cars', component: CarListComponent, canActivate: [authGuard] },
  { path: 'trucks', component: TruckListComponent, canActivate: [authGuard] },

  // Admin (lazy + role check)
  {
    path: 'admin',
    canActivate: [authGuard],
    data: { role: 'ADMIN' },
    loadComponent: () => import('./admin/admin').then(m => m.AdminComponent)
  },

  // Unauthorized (lazy, no guard)
  {
    path: 'unauthorized',
    loadComponent: () => import('../unauthorized/unauthorized').then(m => m.UnauthorizedComponent)
  },

  // Default route
  { path: '', redirectTo: 'cars', pathMatch: 'full' },

  // 404 – MUST BE LAST
  { path: '**', component: NotFoundComponent }
];

*/

/*
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'cars', component: CarListComponent, canActivate: [authGuard] },
  { path: 'trucks', component: TruckListComponent, canActivate: [authGuard] },

  {
    path: 'admin',
    canActivate: [authGuard],
    data: { role: 'ADMIN' },
    loadComponent: () => import('./admin/admin').then(m => m.AdminComponent)
  },

  {
    path: 'unauthorized',
    loadComponent: () => import('../unauthorized/unauthorized').then(m => m.UnauthorizedComponent)
  },

  // Default route
  { path: '', redirectTo: 'cars', pathMatch: 'full' },

  // 404 – MUST BE LAST
  {
    path: '**',
    loadComponent: () => import('../not-found/not-found').then(m => m.NotFoundComponent)
  },

   { 
    path: 'unauthorized', component: UnauthorizedComponent
   }
];
*/
export const routes: Routes = [

  // Auth
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Protected pages
  { path: 'cars', component: CarListComponent, canActivate: [authGuard] },
  { path: 'trucks', component: TruckListComponent, canActivate: [authGuard] },

  // Admin (lazy + role protected)
  {
    path: 'admin',
    canActivate: [authGuard],
    data: { role: 'ADMIN' },
    loadComponent: () =>
      import('./admin/admin').then(m => m.AdminComponent)
  },

  // Unauthorized (NO guard)
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('../unauthorized/unauthorized')
        .then(m => m.UnauthorizedComponent)
  },

  // Default route
  { path: '', redirectTo: 'cars', pathMatch: 'full' },

  // 404 – MUST BE LAST
  {
    path: '**',
    loadComponent: () =>
      import('../not-found/not-found')
        .then(m => m.NotFoundComponent)
  }
];