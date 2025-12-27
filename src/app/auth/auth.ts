import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private api = 'http://localhost:5104/api/auth';

  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }) {
    return this.http.post<any>(`${this.api}/login`, data).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  register(data: { email: string; password: string; name: string }) {
    return this.http.post<any>(`${this.api}/register`, data);
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
