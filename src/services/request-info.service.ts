import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RequestInfoService {

  constructor(private http: HttpClient) {}

  sendRequest(data: any) {
    return this.http.post('https://localhost:5001/api/requestinfo', data);
  }
}