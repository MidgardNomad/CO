import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoursesService } from 'DAL';

@Component({
  selector: 'app-create-new-chapter-dialog',
  templateUrl: './chapter-dialog.component.html',
  styleUrls: ['./chapter-dialog.component.scss'],
})
export class ChapterDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      courseID: string;
      dialogTitle: string;
      button: string;
      numOfChapters: number;
      chapterID: string;
      chapterTitle: string;
      chapterDescription: string;
    },
    private coursesService: CoursesService,
    private matDialogRef: MatDialogRef<ChapterDialogComponent>
  ) {}

  async onSubmitAction(chapterForm: NgForm) {
    let { chapterTitle, chapterDescription } = chapterForm.value;
    if (this.data.chapterID === undefined) {
      try {
        await this.coursesService.createNewCourseChapter(this.data.courseID, {
          title: chapterTitle,
          description: chapterDescription,
          seqNo: this.data.numOfChapters + 1,
        });
        this.matDialogRef.close();
      } catch (error) {
        this.matDialogRef.close();

        console.log(error);
      }
    } else {
      try {
        this.coursesService.editChapterDetails(
          this.data.courseID,
          this.data.chapterID,
          {
            title: chapterTitle ? chapterTitle : this.data.chapterTitle,
            description: chapterDescription
              ? chapterDescription
              : this.data.chapterDescription,
          }
        );
        this.matDialogRef.close();
      } catch (error) {
        this.matDialogRef.close();
        console.log(error.code);
      }
    }
  }
}
