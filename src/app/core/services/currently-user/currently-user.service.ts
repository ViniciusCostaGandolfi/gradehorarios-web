import { Injectable } from '@angular/core';
import { TokenService } from '../jwt-token/token.service';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { TokenUsuarioDto } from '../../interfaces/auth';


@Injectable({
  providedIn: 'root'
})
export class CurrentlyUserService {
  private userSubject = new BehaviorSubject<TokenUsuarioDto | null>(null);

  constructor(private tokenService: TokenService) {
    if(this.tokenService.hasToken()) {
      this.decodeJWT();
    }
  }

  private decodeJWT() {
    const token = this.tokenService.getToken();
    const user = jwtDecode(token) as TokenUsuarioDto;
    this.userSubject.next(user);
  }

  getUser() {
    return this.userSubject.asObservable();
  }

  saveToken(token: string) {
    this.tokenService.saveToken(token);
    this.decodeJWT();
  }

  logout() {
    this.tokenService.deleteToken();
    this.userSubject.next(null);
  }

  hasLogged() {
    return this.tokenService.hasToken();
  }

}
