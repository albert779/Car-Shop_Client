


import { Routes } from '@angular/router';

import { VehicleListComponent } from './vehicle/vehicle-list.component/vehicle-list.component';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { authGuard } from '../guards/auth-guard';
import { VehicleType } from './models/vehicle-type';
import { MyRequestsComponent } from '../my-requests/my-requests';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'cars',
    component: VehicleListComponent,
    canActivate: [authGuard],
    data: {
      vehicleTypeId: VehicleType.Car
    }
  },
  {
    path: 'trucks',
    component: VehicleListComponent,
    canActivate: [authGuard],
    data: {
      vehicleTypeId: VehicleType.Truck
    }
  },


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

  {
    canActivate: [authGuard],
    data: {
      role: 'Manager'
    },
    path: 'my-requests',
    component: MyRequestsComponent

  },

  // Default route
  { path: '', redirectTo: 'cars', pathMatch: 'full' },

  {
    path: 'dashboard',
    component: LoginComponent,
    canActivate: [authGuard]
  },

  {
    path: 'vehicles',
    component: LoginComponent,
    canActivate: [authGuard],
    data: {
      role: 'Admin'
    }
  },

  {
    path: 'messages',
    component: LoginComponent,
    canActivate: [authGuard]
  },

  {
    path: 'profile',
    component: LoginComponent,
    canActivate: [authGuard]
  },

  {
    path: 'settings',
    component: LoginComponent,
    canActivate: [authGuard]
  },

  // 404 – MUST BE LAST
  {
    path: '**',
    loadComponent: () => import('../app/not-found/not-found').then(m => m.NotFoundComponent)
  }




];