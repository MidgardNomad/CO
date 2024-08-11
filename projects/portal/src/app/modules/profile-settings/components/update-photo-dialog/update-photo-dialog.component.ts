import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService, CrudService, User, S3ImgUploaderService } from 'DAL';
import { loadingAnimation } from 'projects/portal/src/app/shared/functions/loadingAnimation';
import { showSnackbar } from 'projects/portal/src/app/shared/functions/showsnackbar';

@Component({
  selector: 'app-update-photo-dialog',
  templateUrl: './update-photo-dialog.component.html',
  styleUrls: ['./update-photo-dialog.component.scss'],
})
export class UpdatePhotoDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { userDoc: User },
    private authService: AuthService,
    private crudService: CrudService,
    private s3ImgUploaderService: S3ImgUploaderService,
    private matDialogRef: MatDialogRef<UpdatePhotoDialogComponent>
  ) {}
  files: File[] = [];
  isLoading = false;
  @ViewChild('uploadPP') uploadPP: ElementRef;
  @ViewChild('loadingSpinner') loadingSpinner: ElementRef;
  loadinfAnimation = loadingAnimation();
  showSnackbar = showSnackbar();

  private uploadImage(file: any): Promise<string> {
    return new Promise((resolve, reject) => {
      this.s3ImgUploaderService.uploadFile(file).send((err, data) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        if (data) {
          console.log(`File has been uploaded Successfuly ${data.Location}`);
          resolve(data.Location);
        }
      });
    });
  }

  onSelect(event) {
    this.files.push(...event.addedFiles);
  }

  async updateProfilePicture() {
    this.loadinfAnimation('block', 0.8, this.loadingSpinner, this.uploadPP);
    this.isLoading = true;
    try {
      let profilePictureURL = await this.uploadImage(this.files[0]);
      this.data.userDoc.photoURL = profilePictureURL;
      await this.authService.updatePhoto(profilePictureURL);
      await this.crudService.updateData('users', this.data.userDoc.id, {
        photoURL: profilePictureURL,
      });
      this.loadinfAnimation('none', 1, this.loadingSpinner, this.uploadPP);
      this.isLoading = false;
      this.matDialogRef.close();
      this.showSnackbar(
        'Profile Picture was updated successfully',
        'success-snackbar'
      );
    } catch (error) {
      this.loadinfAnimation('none', 1, this.loadingSpinner, this.uploadPP);
      this.isLoading = false;
      this.showSnackbar(
        'Something went wrong! Please, try again later',
        'fail-snackbar'
      );
    }
  }
}
