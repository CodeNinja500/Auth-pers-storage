import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserCredentialsModel } from '../models/user-credentials.model';
import { AuthApiResponseModel } from '../models/auth-api-response.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _isUserLoggedInSubject: BehaviorSubject<UserCredentialsModel | null> =
    new BehaviorSubject<UserCredentialsModel | null>(
      this._storage.getItem('accessToken')
        ? {
            accessToken: this._storage.getItem('accessToken'),
            id: this._storage.getItem('id'),
          }
        : null
    );
  public readonly isUserLoggedIn$: Observable<UserCredentialsModel | null> =
    this._isUserLoggedInSubject.asObservable();

  constructor(private _httpClient: HttpClient, private _storage: Storage) {}

  private logInUser(credentials: UserCredentialsModel): void {
    this._isUserLoggedInSubject.next(credentials);

    this._storage.setItem('id', credentials.id!);
    this._storage.setItem('accessToken', credentials.accessToken!);
  }

  public logOutUser(): void {
    this._isUserLoggedInSubject.next(null);
    this._storage.clear();
  }

  public onLoginCheckCredentials(login: {
    email: string;
    password: string;
  }): Observable<UserCredentialsModel> {
    return this._httpClient
      .post<AuthApiResponseModel>(environment.apiUrl + '/auth/login', {
        data: {
          email: login.email,
          password: login.password,
        },
      })
      .pipe(
        map((response) => ({
          id: response.data.id,
          accessToken: response.data.accessToken,
        })),
        tap((data) => this.logInUser(data))
      );
  }
}
