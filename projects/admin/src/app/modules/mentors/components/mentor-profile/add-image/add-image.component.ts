import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Mentor, MentorService } from 'DAL';
import { S3ImgUploaderService } from 'projects/dal/src/lib/aws/s3-img-uploader.service';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.scss'],
})
export class AddImageComponent {
  file: null;
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Mentor,
    private s3ImgUploaderService: S3ImgUploaderService,
    private fb: FormBuilder,
    private mentorService: MentorService
  ) {
    this.form = this.fb.group({
      image: [null],
    });
  }
  //=====================Service-SS3 ==========================

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
  //===============================================

  onFileSelected(event) {
    this.file = event.target.files[0];
    console.log(this.file);
  }
  // ================================

  async onSubmit(form: any) {
    try {
      let imageURL = await this.uploadImage(this.file);

      await this.mentorService.updateMentorProfilePicture(
        this.data.id,
        imageURL
      );

      this.dialogRef.close();
    } catch (error) {
      console.log('error in upload', error);
    }

    // if (this.form.valid) {
    //   const projectObj = {
    //     ...this.form.value,
    //   };
    //   this.dialogRef.close(projectObj);

    //   console.log('projectObj', projectObj);
    // }
  }
  // async onSubmit() {
  //   let imageURL = await this.uploadImage(this.file);

  //   console.log('imageURL', imageURL);

  //   await this.mentorService.updateMentorProfilePicture(this.data.id, imageURL);

  //   this.dialogRef.close();

  //   if (this.form.valid) {
  //     const projectObj = {
  //       ...this.form.value,
  //     };
  //     this.dialogRef.close(projectObj);

  //     console.log('projectObj', projectObj);
  //   }
  // }
}
