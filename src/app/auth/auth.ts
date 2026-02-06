import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LocalStorageService } from '../../local-storage/local-storage';


export interface ApiResponseBase {
  success: boolean;
  message: string;
}

export interface ApiResponse<T> extends ApiResponseBase {
  data: T;
}


 
@Injectable({ providedIn: 'root' })
export class AuthService {
  public readonly TOKEN_KEY = 'token';
  private readonly ROLE_ID_KEY = 'roleId';
  public readonly REDIRECT_URL_KEY = 'redirectUrl';
  private api = 'auth';

  constructor(
    private http: HttpClient,
    private storage: LocalStorageService
  ) {}

  // ===== LOGIN =====
  login(data: { email: string; password: string })
    : Observable<ApiResponse<string>> {

    return this.http
      .post<ApiResponse<string>>(
        `${this.api}/login`,
        data
      )
      .pipe(
        tap(response => {
          if (response.success) {
            debugger;
            this.storage.setValueInStore(this.TOKEN_KEY, response.data);
          }
        })
      );
  }

  // ===== REGISTER =====
  register(data: { email: string; password: string; name: string })
    : Observable<ApiResponse<string>> {

    return this.http.post<ApiResponse<string>>(
      `${this.api}/register`,
      { ...data, roleId: 2 }
    );
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
}