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
  }
  //private apiUrl = 'http://localhost:5104/api/cars';
  private apiUrl = `${environment.apiBaseUrl}/cars`;

  
  
  constructor(private http: HttpClient) {}
  getCars(): Observable<MyCar[]> {
  //  return this.http.get<MyCar[]>(this.apiUrl).pipe(delay(2000));
   return this.http.get<MyCar[]>(this.apiUrl).pipe(delay(2000));
    //  delay(2000) // 2 seconds
  }

   
  

  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateCar(car: MyCar): Observable<MyCar> {
  return this.http.put<MyCar>(`${this.apiUrl}/${car.id}`, car);
  //return this.http.put<MyCar>(`${this.apiUrl}/${car.id}`, car);
}
}