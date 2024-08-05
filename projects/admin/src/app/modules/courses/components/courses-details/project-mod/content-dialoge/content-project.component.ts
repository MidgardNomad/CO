import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CoursesService, environment, SsType } from 'DAL';
import { S3ImgUploaderService } from 'projects/dal/src/lib/aws/s3-img-uploader.service';
import { Ss } from 'projects/dal/src/public-api';

@Component({
  selector: 'app-content-project',
  templateUrl: './content-project.component.html',
  styleUrls: ['./content-project.component.scss'],
})
export class ContentProjectComponent {
  file = null;

  isSubmit: boolean = false;
  constructor(
    private dialogRef: MatDialogRef<ContentProjectComponent>,
    private fb: FormBuilder,
    private cs: CoursesService,
    private s3ImgUploaderService: S3ImgUploaderService,
    @Inject(MAT_DIALOG_DATA) private data: { courseID: string }
  ) {}
  // padgeProject = [];
  // ProjectID: string;
  // constructor(private cs: CoursesService, private route: ActivatedRoute) {}
  // ngOnInit() {
  //   this.ProjectID = this.route.snapshot.paramMap.get('id');
  //   this.cs.getDataProject(this.ProjectID).subscribe((data) => {
  //     this.padgeProject = data;
  //   });
  // }

  //===============================================
  // private uploadImage(file: any): Promise<string> {
  //   return new Promise((resolve, reject) => {
  //     this.s3ImgUploaderService.uploadFile(file).send((err, data) => {
  //       if (err) {
  //         console.log(err);
  //         reject(err);
  //       }
  //       if (data) {
  //         console.log(`File has been uploaded Successfuly ${data.Location}`);
  //         resolve(data.Location);
  //       }
  //     });
  //   });
  // }
  //===============================================

  // onFileSelected(event) {
  //   this.file = event.target.files[0];
  //   console.log(this.file);
  // }

  // async onSubmit() {
  //   this.isSubmit = true;
  //   console.log('form', this.myForm.value);

  //   let imageURL = await this.uploadImage(this.file);

  //   this.myForm.patchValue({ image: imageURL });

  //   if (this.myForm.valid) {
  //     const projectObj = {
  //       ...this.myForm.value,
  //     };

  //     console.log('projectObj', projectObj);
  //   }
  // }
}
