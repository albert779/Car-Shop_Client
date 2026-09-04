

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { LocalStorageService } from './local-storage';



// // ==============================
// // API RESPONSE
// // ==============================
export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

interface UserClaims {
  firstName: string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
  id: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  roleId: string;
  exp: number;
  iss: string;
  aud: string;
}



// API response contains only token
interface LoginResponse {
  token: string
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly API_LOGIN = 'auth/login';
  private readonly TOKEN_KEY = 'token';
  //   private readonly API = 'auth';

  constructor(private http: HttpClient, private storageService: LocalStorageService) { }


  // ===== LOGIN =====
  login(credentials: { email: string; password: string }): Observable<boolean> {
    return this.http
      .post<ApiResponse<LoginResponse>>(this.API_LOGIN, credentials)
      .pipe(
        map((res: ApiResponse<LoginResponse>) => {

          if (!res || !res.data.token) {
            return false
            throw new Error('Invalid login response');
          }

          // ✅ Save ONLY token string
          this.storageService.setValueInStore(this.TOKEN_KEY, res.data.token);
          return res.success;
        })
      );
  }


  //   // ==============================
  //   // REGISTER
  //   // ==============================
  register(data: {
    email: string;
    password: string;
    name: string;
  }): Observable<ApiResponse<string>> {

    return this.http.post<ApiResponse<string>>(
      `${this.API_LOGIN}/register`,
      {
        ...data,
        roleId: 2 // Default roleId for new users
      }
    );
  }
  // ===== LOGOUT =====
  logout(): void {
    // this.storageService.removeValueFromStore(this.TOKEN_KEY);
    // this.storageService.removeValueFromStore(this.ROLE_KEY);
    this.storageService.clearAll();
  }

  // ===== GET TOKEN =====
  getToken(): string | null {
    return this.storageService.getValueFromStore(this.TOKEN_KEY);
  }

  // ===== CHECK LOGIN =====
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getRoleId(): number {
    const userClaims = this.getUser();
    if (!userClaims) {
      return -1; // or throw an error, or return a default value
    }
    const roleIDString = userClaims.roleId;
    return Number(roleIDString);
  }
  hasRole(roleId: number): boolean {
    return this.getRoleId() === roleId;
  }

  getUser(): UserClaims | null {
    const token = this.getToken();
    if (token == null) {
      return null;
    }
    return this.getUserClainsFromToken(token);
  }
  setToken(token: string): void {
    this.storageService.setValueInStore(this.TOKEN_KEY, token);
  }

  private getUserClainsFromToken(token: string): UserClaims | null {
    if (!token) {
      return null;
    }

    const payloadRaw = token.split('.')[1];

    const decodedPayload = atob(
      payloadRaw.replace(/-/g, '+').replace(/_/g, '/')
    );

    const payload = JSON.parse(decodedPayload);
    return payload;


  }
}

