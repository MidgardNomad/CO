import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { environment } from 'DAL';
import { S3ImgUploaderService } from 'projects/dal/src/lib/aws/s3-img-uploader.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent {
  tinyEditorApiKey: string = environment.tinyApiKey;
  file = null;
  isSubmit: boolean = false;

  myForm: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<AddProjectComponent>,
    private fb: FormBuilder,
    private s3ImgUploaderService: S3ImgUploaderService
  ) {
    this.myForm = this.fb.group({
      title: ['', Validators.required],
      requirement: ['', Validators.required],
      content: ['', Validators.required],
      image: ['', Validators.required],
    });
  }
  // addProject() {
  //   if (this.myForm.valid) this.dialogRef.close(this.myForm.value);
  // }

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

  async onSubmit() {
    this.isSubmit = true;
    let imageURL = await this.uploadImage(this.file);

    this.myForm.patchValue({ image: imageURL });

    if (this.myForm.valid) {
      const projectObj = {
        ...this.myForm.value,
      };
      this.dialogRef.close(projectObj);

      console.log('projectObj', projectObj);
    }
  }
}
