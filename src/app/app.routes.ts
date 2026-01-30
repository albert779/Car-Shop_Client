
import { Routes } from '@angular/router';
import { CarListComponent } from './car/car-list.component/car-list.component';
import { TruckListComponent } from './truck/truck-list.component/truck-list.component';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { authGuard } from '../guards/auth-guard';


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
  { path: '**', redirectTo: 'cars' }
];