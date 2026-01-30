import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MyCar } from '../car/myCar';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ApiResponse } from '../auth/auth';


@Injectable({ providedIn: 'root' })
export class CarService {
  private apiUrl = 'cars';
  private cars = new BehaviorSubject<MyCar[]>([]);

  constructor(private http: HttpClient) {}

  loadCars(): void {
    debugger;
    this.http.get<MyCar[]>(this.apiUrl).subscribe(data => this.cars.next(data));
  }

   getCars() {
  return this.http.get<ApiResponse<MyCar[]>>('cars');
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

