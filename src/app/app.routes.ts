


import { Routes } from '@angular/router';

import { VehicleListComponent } from './vehicle/vehicle-list.component/vehicle-list.component';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { authGuard } from '../guards/auth-guard';
import { VehicleType } from './models/vehicle-type';
import { MyRequestsComponent } from '../my-requests/my-requests';
import { NotFoundComponent } from '../app/not-found/not-found';

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
    data: { role: 'Manager' },
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



  {


    path: 'dashboard',
  loadComponent: () =>
    import('../app/not-found/not-found')
      .then(m => m.NotFoundComponent),
  canActivate: [authGuard],
   data: {
      role: 'Manager'
      
    }
  },

  {
     path: 'vehicles',
  loadComponent: () =>
    import('../app/not-found/not-found')
      .then(m => m.NotFoundComponent),
  canActivate: [authGuard],
   data: {
      role: 'Manager'
      
    }
  },

  {
     path: 'messages',
  loadComponent: () =>
    import('../app/not-found/not-found')
      .then(m => m.NotFoundComponent),
  canActivate: [authGuard],
   data: {
      role: 'Manager'
      
    }
  },

  {
     path: 'profile',
  loadComponent: () =>
    import('../app/not-found/not-found')
      .then(m => m.NotFoundComponent),
  canActivate: [authGuard],
   data: {
      role: 'Manager'
      
    }
  },

  {
     path: 'settings',
  loadComponent: () =>
    import('../app/not-found/not-found')
      .then(m => m.NotFoundComponent),
  canActivate: [authGuard],
   data: {
      role: 'Manager'
      
    }
  },
  
// Default route
  { path: '', redirectTo: 'cars', pathMatch: 'full' },

  // 404 – MUST BE LAST
  {
    path: '**',
    loadComponent: () => import('../app/not-found/not-found').then(m => m.NotFoundComponent)
  }




];