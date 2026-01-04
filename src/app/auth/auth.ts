import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private api = 'http://localhost:5104/api/auth';
  private readonly TOKEN_KEY = 'token';

   //isLoggedInSignal = signal<boolean>(!!localStorage.getItem(this.TOKEN_KEY));

  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }) {
    //return this.http.post<any>(`${this.api}/login`, data).pipe(
    return this.http.post<{ token: string }>(`${this.api}/login`, data).pipe(
      tap(res => {
        //localStorage.setItem('token', res.token);
        localStorage.setItem(this.TOKEN_KEY, res.token);
        
      })
    );
  }

  register(data: { email: string; password: string; name: string }) {
    return this.http.post<any>(`${this.api}/register`, data);
  }

  logout() {
    //localStorage.removeItem('token');
    localStorage.removeItem(this.TOKEN_KEY);
    
  }

  isLoggedIn() {
    //return !!localStorage.getItem('token');
    //return this.isLoggedInSignal();
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
