import { Component, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Course, CoursesService } from 'DAL';
import { CourseDialogComponent } from '../../courses-list/course-dialog/course-dialog.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DeleteDialogComponent } from 'projects/admin/src/app/modal/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent implements OnDestroy {
  //============================================
  //Properties
  @Input('course') course: Course;
  deleteDialogSub = new Subscription();
  //============================================

  constructor(
    private matDialog: MatDialog,
    private courseService: CoursesService,
    private router: Router
  ) {}

  //============================================
  //Methods
  onEditCourse() {
    this.matDialog.open(CourseDialogComponent, {
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
    this.deleteDialogSub = this.matDialog
      .open(DeleteDialogComponent, {
        disableClose: true,
        data: {
          messageTail: 'course',
        },
      })
      .afterClosed()
      .subscribe(async (action: boolean) => {
        if (action) {
          await this.courseService.deleteCourse(this.course.id);
        }
      });
  }

  onViewCourse() {
    this.router.navigate(['/courses', this.course.id]);
  }
  //============================================

  ngOnDestroy(): void {
    this.deleteDialogSub.unsubscribe();
  }
}
