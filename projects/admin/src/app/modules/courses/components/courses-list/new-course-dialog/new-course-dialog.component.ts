import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoursesService } from 'DAL';

@Component({
  selector: 'app-new-course-dialog',
  templateUrl: './new-course-dialog.component.html',
  styleUrls: ['./new-course-dialog.component.scss'],
})
export class NewCourseDialogComponent implements OnInit {
  constructor(
    private dilogRef: MatDialogRef<NewCourseDialogComponent>,
    private coursesService: CoursesService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      dialogTitle: string;
      courseID: string;
      courseTitle: string;
      courseDescription: string;
      button: string;
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
          courseDescription
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
