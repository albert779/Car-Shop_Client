/*
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RequestInfoService {

  constructor(private http: HttpClient) {}

  sendRequest(data: any) {
    return this.http.post('http://localhost:5104/api/requestinfo', data);
  }
}
  */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RequestInfoService {

  private apiUrl = 'VehicleRequest';

  constructor(private http: HttpClient) {}

  // Save request to DB
  sendRequest(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // Send email (optional)
  sendEmail(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/send`, data);
  }
}