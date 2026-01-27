
import { Routes } from '@angular/router';
//import { CarsComponent } from "../car/car.component";
import { CarListComponent } from './car/car-list.component/car-list.component';
import { TruckListComponent } from './truck/truck-list.component/truck-list.component';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { authGuard } from './auth/auth.guard';


export const routes: Routes = [

  // 👉 Default page should be login
 // { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // 👉 Cars page
  { path: 'cars', component: CarListComponent,canMatch: [authGuard] },

  // 👉 Trucks page
  { path: 'trucks', component: TruckListComponent,canMatch: [authGuard] },

  {
    path: '',redirectTo: 'login',pathMatch: 'full'},

  // 👉 Optional: 404 handling
  { path: '**', redirectTo: 'login' }
];