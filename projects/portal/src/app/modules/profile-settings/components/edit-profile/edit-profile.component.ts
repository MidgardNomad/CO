import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'DAL';
import { CrudService } from 'projects/dal/src/public-api';
import { Subscription } from 'rxjs';
import { ReauthenticateDialogComponent } from '../reauthenticate-dialog/reauthenticate-dialog.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit, OnDestroy {
  userID: string;
  userPhotoURL: string;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userSubscription: Subscription;
  loading = false;
  constructor(
    private authService: AuthService,
    private crudService: CrudService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      this.userID = user.uid;
      this.userPhotoURL = user.photoURL;
      this.userEmail = user.email;
      [this.userFirstName, this.userLastName] = user.displayName.split(' ');
    });
  }

  async onEditProfile(form: NgForm) {
    this.loading = true;
    const userFirstName =
      form.value.userFirstName === ''
        ? this.userFirstName
        : form.value.userFirstName;
    const userLastName =
      form.value.userSecondName === ''
        ? this.userLastName
        : form.value.userSecondName;
    // const userEmail = form.value.userEmail;
    const userBIO = form.value.userBIO;
    try {
      if (form.value.userFirstName !== '' || form.value.userSecondName !== '') {
        await this.authService.updateDisplayName(userFirstName, userLastName);
        await this.crudService.updateData('users', this.userID, {
          displayName: `${userFirstName} ${userLastName}`,
        });
      }
      if (userBIO !== '') {
        await this.crudService.updateData('users', this.userID, {
          bio: userBIO,
        });
      }
      // if (userEmail !== '') {
      //   this.matDialog.open(ReauthenticateDialogComponent, {
      //     height: '300px',
      //     width: '500px',
      //     disableClose: true,
      //     data: {
      //       title: 'Update Your Account Info',
      //       header: 'Enter Your Password to Confrim Updating Your Info',
      //       button: 'Update Profile',
      //       class: 'update-profile',
      //       email: userEmail,
      //     },
      //   });
      // }
      this.loading = false;
    } catch (error) {
      this.loading = false;
      console.log(error);
    }
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
