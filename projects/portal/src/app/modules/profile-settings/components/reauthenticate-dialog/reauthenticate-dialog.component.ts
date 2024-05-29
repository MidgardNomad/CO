import { AuthService } from './../../../../../../../dal/src/lib/services/auth.service';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-reauthenticate-dialog',
  templateUrl: './reauthenticate-dialog.component.html',
  styleUrls: ['./reauthenticate-dialog.component.scss'],
})
export class ReauthenticateDialogComponent {
  loading = false;
  somethingWentWrong = false;
  constructor(
    private matDialogRef: MatDialogRef<ReauthenticateDialogComponent>,
    private authService: AuthService
  ) {}

  onDeleteAccount(password: string) {
    this.loading = true;
    this.authService
      .deleteAccount(password)
      .pipe(
        catchError(() => {
          return throwError(() => new Error('err'));
        }),
        tap((res) => res)
      )
      .subscribe({
        next: () => {},
        error: (err) => {
          console.log(err);
        },
      });
  }
}
