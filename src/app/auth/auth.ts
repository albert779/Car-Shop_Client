import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Observable, tap } from 'rxjs';
import { LocalStorageService } from '../../local-storage/local-storage';
import { Observable, tap, map } from 'rxjs';
import { switchMap } from 'rxjs';


export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T; // token will be here
  
}

export interface LoggedUser {
 firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  token: string; // ✅ make token required
}



interface LoginResponse {
  token: string;
  user: LoggedUser;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly TOKEN_KEY = 'token';
  private readonly ROLE_ID_KEY = 'roleId';
  private readonly USER_KEY = 'user';
  private readonly API = 'auth';

  constructor(
    private http: HttpClient,
    private storage: LocalStorageService
  ) {}

  // ===== LOGIN =====

  /*
  login(data: { email: string; password: string }): Observable<ApiResponse<string>> {
    return this.http
      .post<ApiResponse<string>>(`${this.API}/login`, data)
      .pipe(
        tap((response: ApiResponse<string>) => {
          if (response.success && response.data) {
            // Save ONLY the token string
            this.storage.setValueInStore(this.TOKEN_KEY, response.data);
          }
        })
      );
  }
   */
login(data: { email: string; password: string }): Observable<ApiResponse<LoginResponse>> {
  return this.http.post<ApiResponse<LoginResponse>>(`${this.API}/login`, data).pipe(
    tap(response => {
      if (response.success && response.data) {
        // 1️⃣ Save token
        this.storage.setValueInStore(this.TOKEN_KEY, response.data.token);

        // 2️⃣ Save user object as JSON string
        this.storage.setValueInStore(this.USER_KEY, JSON.stringify(response.data.user));
      }
    })
  );
}

  // ===== REGISTER =====
  register(data: { email: string; password: string; name: string }): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(
      `${this.API}/register`,
      { ...data, roleId: 2 }
    );
  }

  /*
setUser(user: LoggedUser): void {
  this.storage.setValueInStore(this.TOKEN_KEY, user.token);
  this.storage.setValueInStore(this.USER_KEY, JSON.stringify(user));
}


   // ✅ NEW: Get logged-in user info
  getUser(): LoggedUser | null {
    const user = this.storage.getValueFromStore(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }
*/

setUser(user: LoggedUser): void {
  // Save token
  this.storage.setValueInStore(this.TOKEN_KEY, user.token);

  // Save user object
  this.storage.setValueInStore(this.USER_KEY, JSON.stringify(user));

  console.log('User saved to storage:', user);
}


/*
// ✅ Get logged-in user info
getUser(): LoggedUser | null {
  const userString = this.storage.getValueFromStore(this.USER_KEY);

  if (!userString) return null;

  try {
    const user: LoggedUser = JSON.parse(userString);
    return user;
  } catch (err) {
    console.warn('Failed to parse stored user', err);
    return null;
  }
}
  */

getUser() {
  const user = localStorage.getItem('user');

  if (!user || user === 'undefined') return null;

  try {
    return JSON.parse(user);
  } catch (e) {
    console.error('Failed to parse stored user', e);
    return null;
  }
}

  // ===== LOGOUT =====
  logout(): void {
    this.storage.clearAll();
  }

  // ===== HELPERS =====
  getToken(): string | null {
    return this.storage.getValueFromStore(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  hasRole(roleId: number): boolean {
    return this.storage.getValueFromStore(this.ROLE_ID_KEY) === roleId.toString();
  }

    setToken(token: string): void {
    this.storage.setValueInStore(this.TOKEN_KEY, token);
  }

  clear(): void {
    this.storage.removeValueFromStore(this.TOKEN_KEY);
  }
}