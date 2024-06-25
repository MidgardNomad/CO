import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoursesService, Ss, SsType } from 'DAL';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { S3ImgUploaderService } from 'projects/dal/src/lib/aws/s3-img-uploader.service';

@Component({
  selector: 'app-add-slide-dialog',
  templateUrl: './add-slide-dialog.component.html',
  styleUrls: ['./add-slide-dialog.component.scss'],
})
export class AddSlideDialogComponent implements OnInit {
  file = null;
  constructor(
    private coursesService: CoursesService,
    @Inject(MAT_DIALOG_DATA)
    private data: {
      courseID: string;
      chapterID: string;
      lectureID: string;
      seqNo: number;
    },
    private matDialogRef: MatDialogRef<AddSlideDialogComponent>,
    private s3ImgUploaderService: S3ImgUploaderService
  ) {}

  //Utilities:
  //===============================================
  private uploadImage(file: NgxFileDropEntry): Promise<string> {
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

  ngOnInit(): void {}

  private add(data: Ss) {
    return this.coursesService.addSlide(
      this.data.courseID,
      this.data.chapterID,
      this.data.lectureID,
      data
    );
  }

  onFileSelected(event) {
    this.file = event.target.files[0];
    console.log(this.file);
  }

  async onSubmit(form: NgForm, slideType: string) {
    const {
      text,
      fillAnswer,
      mcqAnswer,
      firstOption,
      secondOption,
      thirdOption,
      fourthOption,
    } = form.value;
    switch (slideType) {
      case 'text':
        try {
          await this.add({
            type: SsType.Text,
            text: text,
            seqNo: this.data.seqNo,
          } as Ss);
          this.matDialogRef.close();
          break;
        } catch (error) {
          console.log(error);
          break;
        }
      case 'text-image':
        try {
          let imageURL = await this.uploadImage(this.file);
          await this.add({
            type: SsType.TextImage,
            text: text,
            seqNo: this.data.seqNo,
            image: imageURL,
          } as Ss);
          this.matDialogRef.close();
          break;
        } catch (error) {
          console.log(error);
          break;
        }
      case 'mcq':
        try {
          let options = [firstOption, secondOption];
          if (thirdOption) options.push(thirdOption);
          if (fourthOption) options.push(fourthOption);
          await this.add({
            type: SsType.MCQ,
            question: text,
            mcqAnswer: mcqAnswer,
            options: options,
            seqNo: this.data.seqNo,
          } as Ss);
          this.matDialogRef.close();
          break;
        } catch (error) {
          console.log(error);
          break;
        }
      case 'q-fill':
        try {
          await this.add({
            type: SsType.QFill,
            question: text,
            qAnswer: fillAnswer,
            seqNo: this.data.seqNo,
          } as Ss);
          this.matDialogRef.close();
          break;
        } catch (error) {
          break;
        }
    }
  }
}
