import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

export const KEY = 'GRADEHORARIOS_TOKEN';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly platformId = inject(PLATFORM_ID);

  saveToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(KEY, token);
    }
  }

  deleteToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(KEY);
    }
  }

  getToken(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(KEY) ?? '';
    }
    // No servidor, sempre retorna vazio
    return '';
  }

  getExp(): number {
    const token = this.getToken();
    // Se não tem token (ou se está no servidor), retorna 0 imediatamente
    if (!token) return 0;

    try {
      const { exp } = jwtDecode<{ exp: number }>(token);
      return exp || 0;
    } catch {
      return 0;
    }
  }
  
  hasToken(): boolean {
    // Se estiver no servidor, retornamos false para evitar que o servidor 
    // tente fazer chamadas autenticadas que dependem do localStorage
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    const token = this.getToken();
    if (this.hasExpired() && !!token) {
      this.deleteToken();
      return false;
    }
    return !!token;
  }

  hasExpired(): boolean {
    // Se não tem token, tecnicamente não está expirado, apenas não existe
    const exp = this.getExp();
    if (exp === 0) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return exp < currentTime;
  }
}