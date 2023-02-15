import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class CookieStorage implements Storage {
  constructor(private _cookieService: CookieService) {}
  [name: string]: any;
  length: any;
  clear(): void {
    this._cookieService.deleteAll();
  }
  getItem(key: string): string | null {
    return this._cookieService.get(key);
  }
  key(index: number): string | null {
    throw new Error('Method not implemented.');
  }
  removeItem(key: string): void {
    this._cookieService.delete(key);
  }
  setItem(key: string, value: string): void {
    this._cookieService.set(key, value);
  }
}
