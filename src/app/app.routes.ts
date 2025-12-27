
import { Routes } from '@angular/router';
//import { CarsComponent } from "../car/car.component";
import { CarListComponent } from './car/car-list.component/car-list.component';
import { TruckListComponent } from './truck/truck-list.component/truck-list.component';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';


/*

export const routes: Routes = [
  { path: '', redirectTo: 'cars', pathMatch: 'full' },
  { path: 'cars', component: CarListComponent },
  { path: 'trucks', component: TruckListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  // protect cars later with AuthGuard
  { path: 'cars', loadComponent: () => import('./car/car-list.component/car-list.component').then(m => m.CarListComponent) },

  { path: '', redirectTo: 'login', pathMatch: 'full' }

];

//export const routes: Routes = [];
*/

export const routes: Routes = [

  // 👉 Default page should be login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // 👉 Cars page
  { path: 'cars', component: CarListComponent },

  // 👉 Trucks page
  { path: 'trucks', component: TruckListComponent },

  // 👉 Optional: 404 handling
  { path: '**', redirectTo: 'login' }
];