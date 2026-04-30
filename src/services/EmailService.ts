/*
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RequestInfoDto {
  carId: number;
  userId: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  details: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'https://localhost:5104/api/request'; // your API endpoint

  constructor(private http: HttpClient) {}

  sendRequest(dto: RequestInfoDto): Observable<any> {
    return this.http.post(this.apiUrl, dto);
  }
}
  */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RequestInfoDto {
  carId: number;
  userId: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  details: string;
}

@Injectable({
  providedIn: 'root'
})
export class RequestInfoService {

  // 🔥 FIX: use HTTP (or correct HTTPS port)
  private readonly apiUrl = 'http://localhost:5104/api/request';

  constructor(private http: HttpClient) {}

  sendRequest(dto: RequestInfoDto): Observable<any> {
    return this.http.post<any>(this.apiUrl, dto);
  }

  // optional (email endpoint)
  sendEmail(dto: RequestInfoDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/send`, dto);
  }
}