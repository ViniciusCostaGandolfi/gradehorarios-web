import { inject, Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import type { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import type { TokenUserDto } from '../../interfaces/auth';
import { TokenService } from '../jwt-token/token.service';


@Injectable({
  providedIn: 'root'
})
export class CurrentlyUserService {
  private userSubject = new BehaviorSubject<TokenUserDto | null>(null);
  private tokenService = inject(TokenService);

  constructor() {
    if (this.tokenService.hasToken()) {
      this.decodeJWT();
    }
  }

  private decodeJWT(): void {
    const token = this.tokenService.getToken();
    const user = jwtDecode(token);
    this.userSubject.next(user as TokenUserDto);
  }

  getUser(): Observable<TokenUserDto | null> {
    return this.userSubject.asObservable();
  }

  saveToken(token: string): void {
    this.tokenService.saveToken(token);
    this.decodeJWT();
  }

  logout(): void {
    this.tokenService.deleteToken();
    this.userSubject.next(null);
  }

  hasLogged(): boolean {
    return this.tokenService.hasToken();
  }

}
