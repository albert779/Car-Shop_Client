

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { LocalStorageService } from './local-storage';

// API response contains only token
interface LoginResponse {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly API_LOGIN = 'http://localhost:5104/api/auth/login';
  private readonly TOKEN_KEY = 'token';

  constructor(private http: HttpClient, private storage: LocalStorageService) {}

  // ===== LOGIN =====
  login(credentials: { email: string; password: string }): Observable<string> {
    return this.http
      .post<LoginResponse>(this.API_LOGIN, credentials)
      .pipe(
        map((res: LoginResponse) => {

          if (!res || !res.token) {
            throw new Error('Invalid login response');
          }

          // ✅ Save ONLY token string
          this.storage.setValueInStore(this.TOKEN_KEY, res.token);

          // return token if needed
          return res.token;
        })
      );
  }

  // ===== LOGOUT =====
  logout(): void {
    this.storage.removeValueFromStore(this.TOKEN_KEY);
  }

  // ===== GET TOKEN =====
  getToken(): string | null {
    return this.storage.getValueFromStore(this.TOKEN_KEY);
  }

  // ===== CHECK LOGIN =====
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}