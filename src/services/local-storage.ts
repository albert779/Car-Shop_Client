import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


  /*
  public setValueInStore(key: string,value: string ){
     localStorage.setItem(key, value);

  }
    public getValueFromStore(key: string ): string | null {
     return localStorage.getItem(key);

  }
     */

 public setValueInStore(key: string, value: any): void {
    if (value === undefined || value === null) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.error(`Failed to store object for key: ${key}`);
    }
  }

  // Get an object safely
  public getValueFromStore<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (!item || item === 'undefined') return null;
    try {
      return JSON.parse(item) as T;
    } catch {
      console.error(`Failed to parse object from key: ${key}`);
      return null;
    }
  }

    public removeValueFromStore(key: string ): void {
     localStorage.removeItem(key);

  }
// ===== CLEAR ALL =====
  clearAll(): void {
    localStorage.clear();
  }
}