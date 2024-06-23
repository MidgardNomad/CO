import {
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService, CrudService } from 'DAL';
import { errorHandler } from 'projects/portal/src/app/shared/functions/errorHandler';
import { loadingAnimation } from 'projects/portal/src/app/shared/functions/loadingAnimation';
import { showSnackbar } from 'projects/portal/src/app/shared/functions/showsnackbar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reauthenticate-dialog',
  templateUrl: './reauthenticate-dialog.component.html',
  styleUrls: ['./reauthenticate-dialog.component.scss'],
})
export class ReauthenticateDialogComponent implements OnInit, OnDestroy {
  userID: string;
  userSubscription: Subscription;
  @ViewChild('loadingSpinner') loadingSpinner: ElementRef;
  @ViewChild('form') form: ElementRef;
  loading = false;
  showSnackBar = showSnackbar();
  loadingAnimation = loadingAnimation();
  constructor(
    private matDialogRef: MatDialogRef<ReauthenticateDialogComponent>,
    private authService: AuthService,
    private crudService: CrudService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      header: string;
      email: string | '';
      button: 'Delete Account' | 'Update Profile';
      class: 'update-profile' | 'delete-account';
    }
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      this.userID = user.uid;
    });
  }

  async onDeleteAccount(password: string) {
    this.loadingAnimation('block', 0.8, this.loadingSpinner, this.form);
    try {
      await this.authService.reauthenticate(password);
      if (this.data.email === '') {
        await this.authService.deleteAccount();
        await this.crudService.deleteData('users', this.userID);
      } else {
        this.authService.updateEmail(this.data.email);
      }
      this.loadingAnimation('none', 1, this.loadingSpinner, this.form);
      this.matDialogRef.close(true);
    } catch (error) {
      this.loadingAnimation('none', 1, this.loadingSpinner, this.form);
      this.showSnackBar(errorHandler(error), 'fail-snackbar');
    }
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
