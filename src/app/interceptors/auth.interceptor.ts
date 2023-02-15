import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, take, tap, timeout } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserCredentialsModel } from '../models/user-credentials.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private credentials$: Observable<UserCredentialsModel | null> =
    this._authService.isUserLoggedIn$;
  constructor(private _authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!request.url.toLowerCase().includes('login')) {
      this.credentials$
        .pipe(
          take(1),
          timeout(5000),
          tap((credentials) => {
            request = request.clone({
              setHeaders: {
                Authorization: `Bearer ${credentials?.accessToken}`,
              },
            });
            return next.handle(request);
          })
        )
        .subscribe();
    }
    return next.handle(request);
  }
}
