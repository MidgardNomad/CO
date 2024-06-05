import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoursesService, Ss, SsType } from 'DAL';
import { NgxFileDropEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-add-slide-dialog',
  templateUrl: './add-slide-dialog.component.html',
  styleUrls: ['./add-slide-dialog.component.scss'],
})
export class AddSlideDialogComponent implements OnInit {
  file: NgxFileDropEntry;
  pathIDs: string[];
  constructor(
    private coursesService: CoursesService,
    @Inject(MAT_DIALOG_DATA)
    private data: {
      courseID: string;
      chapterID: string;
      lectureID: string;
      seqNo: number;
    },
    private matDialogRef: MatDialogRef<AddSlideDialogComponent>
  ) {}

  ngOnInit(): void {
    this.pathIDs = [
      this.data.courseID,
      this.data.chapterID,
      this.data.lectureID,
    ];
  }

  private add(data: Ss) {
    return this.coursesService.addSlide(
      this.data.courseID,
      this.data.chapterID,
      this.data.lectureID,
      data
    );
  }

  dropped(files: NgxFileDropEntry[]) {
    this.file = files[0];
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
            seqNo: this.data.seqNo + 1,
            text: text,
          } as Ss);
          this.matDialogRef.close();
          break;
        } catch (error) {
          console.log(error);
          break;
        }
      case 'text-image':
        try {
          await this.add({
            type: SsType.TextImage,
            text: text,
            seqNo: this.data.seqNo,
            image: 'sample',
          } as Ss);
          this.matDialogRef.close();
          break;
        } catch (error) {
          console.log(error);
          break;
        }
      case 'mcq':
        try {
          await this.add({
            type: SsType.MCQ,
            question: text,
            answer: mcqAnswer,
            options: [firstOption, secondOption, thirdOption, fourthOption],
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
            answer: fillAnswer,
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
