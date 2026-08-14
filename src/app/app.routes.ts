


import { Routes } from '@angular/router';
//import { CarListComponent } from './car/car-list.component/car-list.component';
//import { TruckListComponent } from './truck/truck-list.component/truck-list.component';
import { VehicleListComponent } from './vehicle/vehicle-list.component/vehicle-list.component';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { authGuard } from '../guards/auth-guard';
import { NotFoundComponent } from '../app/not-found/not-found';
import { VehicleType } from './models/vehicle-type';
import { MyRequestsComponent } from '../my-requests/my-requests';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // { path: 'cars', component: CarListComponent, canActivate: [authGuard] },
  // { path: 'trucks', component: TruckListComponent, canActivate: [authGuard] },
  //{ path: 'vehicle', component: VehicleListComponent, canActivate: [authGuard] },

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
    path: 'my-requests',
    component: MyRequestsComponent

  },

  // Default route
  { path: '', redirectTo: 'cars', pathMatch: 'full' },

  // 404 – MUST BE LAST
  {
    path: '**',
    loadComponent: () => import('../app/not-found/not-found').then(m => m.NotFoundComponent)
  }


];