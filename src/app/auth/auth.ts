import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';



export interface ApiResponseBase {
  success: boolean;
  message: string;
}

export interface ApiResponse<T> extends ApiResponseBase {
  data: T;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'auth';
  private key = 'token';

  constructor(private http: HttpClient) {}

  saveToken(token: string){
    localStorage.setItem(this.key, token);
  }

  login(data: { email: string; password: string }):Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(`${this.api}/login`, data);
  }

  register(data: { email: string; password: string; name: string }):Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(`${this.api}/register`, data);
  }

  logout() {
    localStorage.removeItem(this.key);
    
  }

  isLoggedIn() {
    const token = this.getToken();
    if(token== null){
      return false;
    }
    return true;
  }

  getToken(): string | null {
    return localStorage.getItem(this.key);
  }
}
