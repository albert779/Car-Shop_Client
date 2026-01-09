import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';


export interface AuthResponse{
  success:boolean;
  message:string;
  token:string;
}


@Injectable({ providedIn: 'root' })
export class AuthService {

  private api = 'auth';
  private key = 'token';

  constructor(private http: HttpClient) {}

  sevaToken(token: string){
    localStorage.setItem(this.key, token);
  }

  login(data: { email: string; password: string }):Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.api}/login`, data);
  }

  register(data: { email: string; password: string; name: string }):Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.api}/register`, data);
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
