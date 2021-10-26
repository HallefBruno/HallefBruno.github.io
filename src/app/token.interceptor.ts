import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  jwtHelperService: JwtHelperService = new JwtHelperService();

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const url = request.url;
    if(this.authService.isAuthenticated() && !url.endsWith("/oauth/token")) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer '+this.authService.obterToken()
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
    return next.handle(request);
  }
}
