import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LoggedInComponent } from './components/logged-in/logged-in.component';
import { LoginComponentModule } from './components/login/login.component-module';
import { LoggedInComponentModule } from './components/logged-in/logged-in.component-module';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'logged-in', component: LoggedInComponent },
    ]),
    LoginComponentModule,
    LoggedInComponentModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
