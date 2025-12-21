
import { Routes } from '@angular/router';
//import { CarsComponent } from "../car/car.component";
import { CarListComponent } from './car-list.component/car-list.component';
import { TruckListComponent } from './truck-list.component/truck-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'cars', pathMatch: 'full' },
  { path: 'cars', component: CarListComponent },
  { path: 'trucks', component: TruckListComponent },
];

//export const routes: Routes = [];
