import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MeModel } from '../models/me.model';
import { MeResponseModel } from '../models/me-response.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private _httpClient: HttpClient) {}

  getMe(): Observable<MeModel> {
    return this._httpClient
      .get<MeResponseModel>(environment.apiUrl + '/auth/me')
      .pipe(
        map((response) => ({
          id: response.data.user.context.user_id,
          email: response.data.user.context.email,
        }))
      );
  }
}
