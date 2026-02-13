import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public setValueInStore(key: string,value: string ){
     localStorage.setItem(key, value);

  }
    public getValueFromStore(key: string ): string | null {
     return localStorage.getItem(key);

  }
    public removeValueFromStore(key: string ): void {
     localStorage.removeItem(key);

  }
// ===== CLEAR ALL =====
  clearAll(): void {
    localStorage.clear();
  }
}