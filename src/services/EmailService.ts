import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RequestInfoDto {
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
  private apiUrl = 'https://localhost:5001/api/request'; // your API endpoint

  constructor(private http: HttpClient) {}

  sendRequest(dto: RequestInfoDto): Observable<any> {
    return this.http.post(this.apiUrl, dto);
  }
}