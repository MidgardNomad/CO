import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Course, CoursesService } from 'DAL';
import { NewCourseDialogComponent } from '../courses-list/new-course-dialog/new-course-dialog.component';
import { DeleteCourseDialogComponent } from './delete-course-dialog/delete-course-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent {
  @Input('course') course: Course;

  constructor(
    private matDialog: MatDialog,
    private courseService: CoursesService,
    private router: Router
  ) {}

  onEditCourse() {
    this.matDialog.open(NewCourseDialogComponent, {
      data: {
        dialogTitle: `Edit ${this.course.title} Information`,
        courseID: this.course.id,
        courseTitle: this.course.title,
        courseDescription: this.course.description,
        button: 'Save Changes',
      },
      disableClose: true,
    });
  }

  onDeleteCourse() {
    let deleteDialogRef = this.matDialog.open(DeleteCourseDialogComponent, {
      disableClose: true,
      data: {
        courseTitle: this.course.title,
      },
    });
    deleteDialogRef.afterClosed().subscribe(async (action: boolean) => {
      if (action) {
        await this.courseService.deleteCourse(this.course.id);
      }
    });
  }

  onViewCourse() {
    this.router.navigate(['/courses', this.course.id]);
  }
}
