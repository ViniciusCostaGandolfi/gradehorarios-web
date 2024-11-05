import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';


export const KEY = 'ROTAFOOD_TOKEN';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  saveToken(token: string): void {
    localStorage.setItem(KEY, token)
  }

  deleteToken(): void {
    localStorage.removeItem(KEY)
  }

  getToken(): string {
    return localStorage.getItem(KEY) ?? ''
  }


  getExp(): number {
    try {
      const { exp } = jwtDecode(this.getToken());
      return exp as number
    } catch {
      return 0
    }

  }
  
  hasToken(): boolean {
    if (this.hasExpired() && !!this.getToken()) {
      this.deleteToken()
      return false;
    }
    return !!this.getToken();
  }

  hasExpired(): boolean | null {
    const currentTime = Math.floor(Date.now() / 1000);
    return this.getExp() < currentTime
  }

}


