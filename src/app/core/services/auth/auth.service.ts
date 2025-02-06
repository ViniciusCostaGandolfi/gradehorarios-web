import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CurrentlyUserService } from '../currently-user/currently-user.service';
import { Token } from '@angular/compiler';
import { AuthToken, UserCreation, UserLogin } from '../../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  private apiUrl: string = environment.GRADEHORARIOS_API;
  constructor(
    private http: HttpClient,
    private currentlyUserService: CurrentlyUserService
    ) { }

  createUser(user: UserCreation): Observable<Token|any> {
    const url = `${this.apiUrl}/v1/auth/sigin`;

    
    return this.http.post<Token|any>(url, user, { observe: 'response' }).pipe(
      tap(response => {
        const authToken = response.body?.accessToken;
        if (authToken) {
          this.currentlyUserService.saveToken(authToken);
        }
      })
    );
  }

  login(userLogin: UserLogin): Observable<AuthToken|any> {
    const url = `${this.apiUrl}/v1/auth/login`;
    console.log(userLogin)
    return this.http.post<Token|any>(url, userLogin, { observe: 'response' }).pipe(
      tap(response => {
        const authToken = response.body?.accessToken;
        if (authToken) {
          this.currentlyUserService.saveToken(authToken);
        }
      })
    );
  }

  refreshToken():void {
    const url = `${this.apiUrl}/auth/refresh_token`;
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


  requestPasswordReset(email: string): Observable<string> {
    const url = `${this.apiUrl}/v1/auth/forgot_password`;
    return this.http.post(url, { email }, { responseType: 'text' });
  }


  resetPassword(payload: { token: string, newPassword: string }): Observable<string> {
    const url = `${this.apiUrl}/v1/auth/reset_password`;
    return this.http.post(url, payload, { responseType: 'text' });
  }
}
