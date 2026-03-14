import type { HttpResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable} from 'rxjs';
import { tap } from 'rxjs';

import { environment } from '../../../../environments/environment';
import type { AuthToken, UserCreation, UserLogin } from '../../interfaces/auth';
import { CurrentlyUserService } from '../currently-user/currently-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = environment.GRADEHORARIOS_API;
  
  private http = inject(HttpClient);
  private currentlyUserService = inject(CurrentlyUserService);

  createUser(user: UserCreation): Observable<HttpResponse<AuthToken>> {
    const url = `${this.apiUrl}/api/auth/sigin`;

    return this.http.post<AuthToken>(url, user, { observe: 'response' }).pipe(
      tap(response => {
        const authToken = response.body?.token;
        if (authToken) {
          this.currentlyUserService.saveToken(authToken);
        }
      })
    );
  }

  login(userLogin: UserLogin): Observable<HttpResponse<AuthToken>> {
    const url = `${this.apiUrl}/api/auth/login`;
    return this.http.post<AuthToken>(url, userLogin, { observe: 'response' }).pipe(
      tap(response => {
        const authToken = response.body?.token;
        if (authToken) {
          this.currentlyUserService.saveToken(authToken);
        }
      })
    );
  }

  refreshToken(): void {
    const url = `${this.apiUrl}/auth/refresh_token`;
    this.http.post<AuthToken>(url, { observe: 'response' }).pipe(
      tap(response => {
        const authToken = response.token;
        if (authToken) {
          this.currentlyUserService.saveToken(authToken);
        } else {
          this.currentlyUserService.logout();
        }
      })
    ).subscribe();
  }


  requestPasswordReset(email: string): Observable<string> {
    const url = `${this.apiUrl}/api/auth/forgot_password`;
    return this.http.post(url, { email }, { responseType: 'text' });
  }


  resetPassword(payload: { token: string; newPassword: string }): Observable<string> {
    const url = `${this.apiUrl}/api/auth/reset_password`;
    return this.http.post(url, payload, { responseType: 'text' });
  }


  loginWithGoogle(token: string): Observable<HttpResponse<AuthToken>> {
    const url = `${this.apiUrl}/api/auth/google`;
    return this.http.post<AuthToken>(url, { token }, { observe: 'response' }).pipe(
      tap(response => {
        const authToken = response.body?.token;
        if (authToken) {
          this.currentlyUserService.saveToken(authToken);
        }
      })
    );
  }
}
