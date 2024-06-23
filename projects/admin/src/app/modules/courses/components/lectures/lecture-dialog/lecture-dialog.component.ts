import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoursesService } from 'DAL';

@Component({
  selector: 'app-add-lecture-dialog',
  templateUrl: './lecture-dialog.component.html',
  styleUrls: ['./lecture-dialog.component.scss'],
})
export class LectureDialogComponent {
  constructor(
    private coursesService: CoursesService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      lectureID: string;
      chapterTitle: string;
      chapterID: string;
      courseID: string;
      seqNo: number;
    },
    private matDialogRef: MatDialogRef<LectureDialogComponent>
  ) {}
  async onSubmitAction(lectureInfo: NgForm) {
    const lectureTitle = lectureInfo.value.lectureTitle;
    try {
      if (this.data.lectureID) {
        await this.coursesService.editLectureDetails(
          this.data.courseID,
          this.data.chapterID,
          this.data.lectureID,
          { title: lectureTitle }
        );
      } else {
        await this.coursesService.addNewLecture(
          this.data.courseID,
          this.data.chapterID,
          { title: lectureTitle, seqNo: this.data.seqNo }
        );
      }
      this.matDialogRef.close();
    } catch (error) {
      console.log(error);
    }
  }
}
