import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ApiResponse } from '../../auth/auth';

import { MyCarInfo } from '../../models/myCar';
import { MyCarCreateDto } from '../../models/myCarCreateDto';
import { MyCarUpdateDto } from '../../models/MyCarUpdateDto';

import { VehicleType } from '../../models/vehicle-type';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private apiUrl = 'vehicle';

  vehicles = signal<MyCarInfo[]>([]);

  constructor(private http: HttpClient) {}

  // =========================
  // LOAD VEHICLES
  // =========================

  loadVehicles(type: VehicleType): void {

    this.getAll(type).subscribe({

      next: (res) => {

        if (res.success) {

          this.vehicles.set(res.data);

          console.log('📥 Vehicles loaded:', res.data);
      }
      },

      error: (err) => {

        console.error('❌ HTTP Error:', err);
      }
    });
  }

  // =========================
  // GET ALL
  // =========================

  getAll(
  type: VehicleType
): Observable<ApiResponse<MyCarInfo[]>> {

  const vehicleType =
    type === VehicleType.Car
      ? 'Car'
      : 'Truck';

  return this.http.get<ApiResponse<MyCarInfo[]>>(
    `${this.apiUrl}?type=${vehicleType}`
  );
}

  // =========================
  // ADD
  // =========================

  addVehicle(
    vehicle: MyCarCreateDto
  ): Observable<MyCarInfo> {

    return this.http.post<MyCarInfo>(
      this.apiUrl,
      vehicle
    ).pipe(

      tap(() => {

        this.loadVehicles(
          vehicle.vehicleTypeId as VehicleType
        );

      })
    );
  }

  // =========================
  // UPDATE
  // =========================

  updateVehicle(
    id: number,
    payload: MyCarUpdateDto
  ): Observable<MyCarInfo> {

    return this.http.put<MyCarInfo>(
      `${this.apiUrl}/${id}`,
      payload
    ).pipe(

      tap(() => {

        this.loadVehicles(
          payload.vehicleTypeId as VehicleType
        );

      })
    );
  }

  // =========================
  // DELETE
  // =========================

  deleteVehicle(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}