import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { LoggedInComponent } from './logged-in.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    MatCardModule,
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
  ],
  declarations: [LoggedInComponent],
  providers: [],
  exports: [LoggedInComponent],
})
export class LoggedInComponentModule {}
