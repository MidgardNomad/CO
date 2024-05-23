import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ReauthenticateDialogComponent } from '../reauthenticate-dialog/reauthenticate-dialog.component';
import { AuthService } from 'DAL';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, catchError, delay, map, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss'],
})
export class DeleteAccountComponent implements OnDestroy {
  deleteSub = new Subscription();
  r: boolean;
  constructor(
    private matDialog: MatDialog,
    private authService: AuthService,
    private matSnackBar: MatSnackBar
  ) {}

  showSnackBar() {
    this.matSnackBar.open('Hi', null, {
      duration: 3000,
    });
  }

  openReauthenticateDialog() {
    let reauthenticateDialogRef = this.matDialog.open(
      ReauthenticateDialogComponent,
      {
        height: '300px',
        width: '500px',
        disableClose: true,
      }
    );
    reauthenticateDialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) this.showSnackBar();
      // if (result) {
      //   this.deleteSub = this.authService.deleteAccount(result).subscribe({
      //     next: (_) => {},
      //     error: (err) => {
      //       console.log(err.message);
      //     },
      //   });
      // }
    });
  }

  ngOnDestroy(): void {
    this.deleteSub.unsubscribe();
  }
}
