

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

  getRequests(filter: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/list`, filter);
  }


}