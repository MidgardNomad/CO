import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoursesService } from 'DAL';

@Component({
  selector: 'app-new-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.scss'],
})
export class CourseDialogComponent implements OnInit {
  constructor(
    private dilogRef: MatDialogRef<CourseDialogComponent>,
    private coursesService: CoursesService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      dialogTitle: string;
      courseID: string;
      courseTitle: string;
      courseDescription: string;
      button: string;
      seqNo: number;
    }
  ) {}

  ngOnInit(): void {}

  async onSubmitAction(courseForm: NgForm) {
    let courseTitle: string;
    let courseDescription: string;
    if (this.data['courseID'] === undefined) {
      courseTitle = courseForm.value.courseTitle;
      courseDescription = courseForm.value.courseDescription;
      try {
        await this.coursesService.createNewCourse(
          courseTitle,
          courseDescription,
          this.data.seqNo
        );
        this.dilogRef.close();
      } catch (error) {
        console.log(error);
      }
    } else {
      courseTitle = courseForm.value.courseTitle
        ? courseForm.value.courseTitle
        : this.data.courseTitle;
      courseDescription = courseForm.value.courseDescription
        ? courseForm.value.courseDescription
        : this.data.courseDescription;
      try {
        await this.coursesService.editCourse(this.data.courseID, {
          title: courseTitle,
          description: courseDescription,
        });
        this.dilogRef.close();
      } catch (error) {
        console.log(error);
      }
    }
  }
}
