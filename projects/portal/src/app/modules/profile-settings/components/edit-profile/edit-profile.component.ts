import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AuthService, User } from 'DAL';
import { CrudService } from 'projects/dal/src/public-api';
import { loadingAnimation } from 'projects/portal/src/app/shared/functions/loadingAnimation';
import { showSnackbar } from 'projects/portal/src/app/shared/functions/showsnackbar';
import { Subscription } from 'rxjs';
import { DeletePhotoDialogComponent } from '../delete-photo-dialog/delete-photo-dialog.component';
import { UpdatePhotoDialogComponent } from '../update-photo-dialog/update-photo-dialog.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit, OnDestroy {
  user: User;
  @ViewChild('editPForm') editPForm: ElementRef;
  @ViewChild('loadingSpinner') loadingSpinner: ElementRef;
  showSnackBar = showSnackbar();
  loadingAnimation = loadingAnimation();

  //Subcsriptions
  //=================
  private matDialogSub: Subscription;
  //=================
  constructor(
    private authService: AuthService,
    private crudService: CrudService,
    private route: ActivatedRoute,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.user = data['user'];
    });
  }

  onDeletePhoto() {
    this.matDialogSub = this.matDialog
      .open(DeletePhotoDialogComponent)
      .afterClosed()
      .subscribe(async (answer) => {
        if (answer) {
          try {
            this.user.photoURL =
              '../../../../../assets/images/placeholder-avatar.svg';
            await this.authService.updatePhoto(
              '../../../../../assets/images/placeholder-avatar.svg'
            );
            await this.crudService.updateData('users', this.user.id, {
              photoURL: '../../../../../assets/images/placeholder-avatar.svg',
            });
            this.showSnackBar('Updated Successfully', 'success-snackbar');
          } catch (error) {
            this.showSnackBar('Something went wrong', 'fail-snackbar');
          }
        }
      });
  }

  onUpdatePhoto() {
    this.matDialog
      .open(UpdatePhotoDialogComponent, {
        width: '500px',
        data: { userDoc: this.user },
      })
      .afterClosed()
      .subscribe((answer) => {
        console.log(this.user);
      });
  }

  async onEditProfile(form: NgForm) {
    const { userFirstName, userSecondName, userBIO } = form.value;
    this.loadingAnimation('block', 0.8, this.loadingSpinner, this.editPForm);
    try {
      await this.authService.updateDisplayName(userFirstName, userSecondName);
      await this.crudService.updateData('users', this.user.id, {
        displayName: `${userFirstName} ${userSecondName}`,
        bio: userBIO,
      });
      this.loadingAnimation('none', 1, this.loadingSpinner, this.editPForm);
      this.showSnackBar(
        'Your Info has been updated successfully',
        'success-snackbar'
      );
    } catch (error) {
      this.loadingAnimation('none', 1, this.loadingSpinner, this.editPForm);

      this.showSnackBar(
        'Something went wrong! please try again later.',
        'fail-snackbar'
      );

      console.log(error);
    }
  }
  ngOnDestroy(): void {
    if (this.matDialogSub) this.matDialogSub.unsubscribe();
  }
}
