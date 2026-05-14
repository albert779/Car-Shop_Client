import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MyCarInfo } from'../models/myCar';
import { MyCarCreateDto } from '../models/myCarCreateDto';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ApiResponse } from '../auth/auth';
import { MyCarUpdateDto } from '../models/MyCarUpdateDto';


@Injectable({ providedIn: 'root' })
export class CarService {
  private apiUrl = 'vehicle';
  private cars = new BehaviorSubject<MyCarInfo[]>([]);

  constructor(private http: HttpClient) {}

  // loadCars(): void {
  //   this.http.get<MyCarInfo[]>(this.apiUrl).subscribe(data => this.cars.next(data));
  // }

   getCars() {
  //return this.http.get<ApiResponse<MyCarInfo[]>>('car');
   return this.http.get<ApiResponse<MyCarInfo[]>>('vehicle?type=Car');
}

  addCar(newCar: MyCarCreateDto): Observable<ApiResponse<MyCarInfo>> {
    //return this.http.post<MyCar>(this.apiUrl, newTruck);
    return this.http.post<ApiResponse<MyCarInfo>>(this.apiUrl, newCar).pipe(
    tap(() => this.getCars())
    );
  }


updateCar(id: number, payload: MyCarUpdateDto): Observable<MyCarInfo> {
  return this.http.put<MyCarInfo>(`${this.apiUrl}/${id}`, payload).pipe(
    tap(() => this.getCars()) // reload the cars after update
  );
}

  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchVehicles(text: string): Observable<ApiResponse<MyCarInfo[]>> {
    return this.http.get<ApiResponse<MyCarInfo[]>>(
      `${this.apiUrl}/search?text=${encodeURIComponent(text)}`
    );
  }
}

