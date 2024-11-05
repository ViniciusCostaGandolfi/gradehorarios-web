import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/jwt-token/token.service';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService)

  if (tokenService.hasToken()) {
    const authToken = tokenService.getToken();
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });
    
    return next(authReq);
  }
  return next(req);
};


