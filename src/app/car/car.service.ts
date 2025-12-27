
/*
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
//import { MyCar } from './myCar';
import { MyCar, environment } from './myCar';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  addCar(car: MyCar): Observable<MyCar> {
    return this.http.post<MyCar>(this.apiUrl, car);
   //  tap(() => this.loadCars())
  }
  private apiUrl = `cars`;
  constructor(private http: HttpClient) {}
  getCars(): Observable<MyCar[]> {
   return this.http.get<MyCar[]>(this.apiUrl).pipe(delay(2000));
  }


  
  //loadCars(): void {
  //  this.http.get<MyCar[]>(this.apiUrl).subscribe(data => this.cars.next(data));
 // }
   
  

  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateCar(car: MyCar): Observable<MyCar> {
  return this.http.put<MyCar>(`${this.apiUrl}/${car.id}`, car);
}
}
*/

/*
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MyCar } from '../car/myCar';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TruckService {
  private trucks = new BehaviorSubject<MyCar[]>([]);

  getTrucks(): Observable<MyCar[]> {
    return this.trucks.asObservable();
  }

  addTruck(newTruck: MyCar) {
    this.trucks.next([...this.trucks.value, newTruck]);
  }

  deleteTruck(id: number){
    this.trucks.next(this.trucks.value.filter(truck => truck.id !== id));
  }

// deleteTruck(id: number): Observable<void> {
//    return this.http.delete<void>(`${this.apiUrl}/${id}`);
 // }
}
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MyCar } from '../car/myCar';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class CarService {
  private apiUrl = 'cars';
  private cars = new BehaviorSubject<MyCar[]>([]);

  constructor(private http: HttpClient) {}

  loadCars(): void {
    this.http.get<MyCar[]>(this.apiUrl).subscribe(data => this.cars.next(data));
  }

  getCars(): Observable<MyCar[]> {
    return this.cars.asObservable();
  }

  addCar(newCar: MyCar): Observable<MyCar> {
    //return this.http.post<MyCar>(this.apiUrl, newTruck);
    return this.http.post<MyCar>(this.apiUrl, newCar).pipe(
    tap(() => this.loadCars())
    );
  }

  updateCar(car: MyCar): Observable<MyCar> {
  return this.http.put<MyCar>(`${this.apiUrl}/${car.id}`, car);
  //return this.http.put<MyCar>(`${this.apiUrl}/${car.id}`, car);
}


  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

