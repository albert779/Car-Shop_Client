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
export class TruckService {
  private apiUrl = 'trucks';
  private trucks = new BehaviorSubject<MyCar[]>([]);

  constructor(private http: HttpClient) {}

  loadTrucks(): void {
    this.http.get<MyCar[]>(this.apiUrl).subscribe(data => this.trucks.next(data));
  }

  getTrucks(): Observable<MyCar[]> {
    return this.trucks.asObservable();
  }

  addTruck(newTruck: MyCar): Observable<MyCar> {
    //return this.http.post<MyCar>(this.apiUrl, newTruck);
    return this.http.post<MyCar>(this.apiUrl, newTruck).pipe(
    tap(() => this.loadTrucks())
    );
  }

  updateTruck(truck: MyCar): Observable<MyCar> {
  return this.http.put<MyCar>(`${this.apiUrl}/${truck.id}`, truck);
  //return this.http.put<MyCar>(`${this.apiUrl}/${car.id}`, car);
}


  deleteTruck(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

