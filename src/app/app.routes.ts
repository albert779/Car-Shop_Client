


import { Routes } from '@angular/router';
import { CarListComponent } from './car/car-list.component/car-list.component';
import { TruckListComponent } from './truck/truck-list.component/truck-list.component';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { authGuard } from '../guards/auth-guard';
import { NotFoundComponent } from '../app/not-found/not-found';

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
    loadComponent: () => import('../app/not-found/not-found').then(m => m.NotFoundComponent)
  }
];