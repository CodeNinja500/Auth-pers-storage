import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  readonly loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private _authService: AuthService, private _router: Router) {}

  onLoginFormSubmitted(loginForm: FormGroup): void {
    if (loginForm.valid) {
      this._authService
        .onLoginCheckCredentials({
          email: loginForm.get('email')?.value,
          password: loginForm.get('password')?.value,
        })
        .pipe(take(1))
        .subscribe({
          next: (x) => this._router.navigate(['/logged-in']),
        });
    }
  }
}
