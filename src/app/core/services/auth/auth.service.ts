import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {  Merchant } from '../../interfaces/merchant';
import { CurrentlyUserService } from '../currently-user/currently-user.service';
import { Token } from '@angular/compiler';
import { AuthToken, MerchantRegistration, MerchantUserLogin, User } from '../../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  private apiUrl: string = environment.ROTAFOOD_API;
  constructor(
    private http: HttpClient,
    private currentlyUserService: CurrentlyUserService
    ) { }

  createMerchant(merchant: Merchant, user: User): Observable<Token|any> {
    const url = `${this.apiUrl}/auth/merchants/create/`;
    const data: MerchantRegistration = {
      'merchant': merchant,
      'user': user
    }

    
    return this.http.post<Token|any>(url, data, { observe: 'response' }).pipe(
      tap(response => {
        const authToken = response.body?.accessToken;
        if (authToken) {
          this.currentlyUserService.saveToken(authToken);
        }
      })
    );
  }

  login(merchantUserLogin: MerchantUserLogin): Observable<AuthToken|any> {
    const url = `${this.apiUrl}/auth/merchant_users/login/`;

    return this.http.post<Token|any>(url, merchantUserLogin, { observe: 'response' }).pipe(
      tap(response => {
        const authToken = response.body?.accessToken;
        if (authToken) {
          this.currentlyUserService.saveToken(authToken);
        }
      })
    );
  }

  refreshToken():void {
    const url = `${this.apiUrl}/auth/refresh_token/`;
    this.http.post<Token|any>(url, { observe: 'response' }).pipe(
      tap(response => {
        const authToken = response.body?.accessToken;
        if (authToken) {
          this.currentlyUserService.saveToken(authToken);
        } else {
          this.currentlyUserService.logout()
        }
      })
    );

  }
}
