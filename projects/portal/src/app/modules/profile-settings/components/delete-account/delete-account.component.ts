import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ReauthenticateDialogComponent } from '../reauthenticate-dialog/reauthenticate-dialog.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss'],
})
export class DeleteAccountComponent implements OnDestroy {
  dialogSub = new Subscription();
  constructor(private matDialog: MatDialog, private router: Router) {}

  openReauthenticateDialog() {
    let reauthenticateDialogRef = this.matDialog.open(
      ReauthenticateDialogComponent,
      {
        height: '300px',
        width: '500px',
        disableClose: true,
        data: {
          title: 'Delete Your Account',
          header: 'Enter Your Password to Confrim Deleting Your Account',
          button: 'Delete Account',
          email: '',
          class: 'delete-account',
        },
      }
    );
    this.dialogSub = reauthenticateDialogRef
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.router.navigate(['/auth']);
        }
      });
  }

  ngOnDestroy(): void {
    this.dialogSub.unsubscribe();
  }
}
