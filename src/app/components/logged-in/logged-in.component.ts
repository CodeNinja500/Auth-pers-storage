import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserCredentialsModel } from '../../models/user-credentials.model';
import { MeModel } from '../../models/me.model';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-logged-in',
  styleUrls: ['./logged-in.component.scss'],
  templateUrl: './logged-in.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoggedInComponent {
  readonly isUserLoggedIn$: Observable<UserCredentialsModel | null> =
    this._authService.isUserLoggedIn$;
  readonly meDetails$: Observable<MeModel> = this._usersService.getMe();

  readonly meDetailsList$: Observable<{ key: string; value: string }[]> =
    this.meDetails$.pipe(
      map((details) =>
        Object.entries(details).map((entry) => ({
          key: entry[0],
          value: entry[1],
        }))
      )
    );

  constructor(
    private _authService: AuthService,
    private _usersService: UsersService
  ) {}

  logOutUser(): void {
    this._authService.logOutUser();
  }
}
