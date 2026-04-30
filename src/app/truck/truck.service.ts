import { Injectable, signal } from '@angular/core';
import {  Observable } from 'rxjs';
import { MyCarInfo } from'../models/myCar';
import { MyCarCreateDto } from '../models/myCarCreateDto';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ApiResponse } from '../auth/auth';
import { MyCarUpdateDto } from '../models/MyCarUpdateDto';


@Injectable({ providedIn: 'root' })
export class TruckService {
  private apiUrl = 'vehicle';
  trucks = signal<MyCarInfo[]>([]);

  constructor(private http: HttpClient) {}
loadTrucks(): void {
    this.getAll().subscribe({
      next: (res) => {
        if (res.success) {
          this.trucks.set(res.data); // ✅ update signal
          console.log('📥 Trucks loaded:', res.data);
        } else {
          console.error('❌ API error:', res.message);
        }
      },
      error: (err) => console.error('❌ HTTP error loading trucks:', err)
    });
  }
   getAll(): Observable<ApiResponse<MyCarInfo[]>> {
  //return this.http.get<ApiResponse<MyCarInfo[]>>(this.apiUrl);
  return this.http.get<ApiResponse<MyCarInfo[]>>('vehicle?type=Truck');
}

  addTruck(newTruck: MyCarCreateDto): Observable<MyCarInfo> {
  return this.http.post<MyCarInfo>(this.apiUrl, newTruck).pipe(
    tap(() => this.loadTrucks()) // now correct: returns MyCarInfo with id
  );
}

  updateTruck(id: number, payload: MyCarUpdateDto): Observable<MyCarInfo> {
  return this.http.put<MyCarInfo>(`${this.apiUrl}/${id}`, payload).pipe(
    tap(() => this.loadTrucks())
  );
}


  deleteTruck(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

