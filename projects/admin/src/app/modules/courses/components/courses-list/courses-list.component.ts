import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Course, CoursesService } from 'DAL';
import { MatDialog } from '@angular/material/dialog';
import { NewCourseDialogComponent } from './new-course-dialog/new-course-dialog.component';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements OnInit {
  courses$: Observable<Course[]>;
  constructor(
    private coursesService: CoursesService,
    private matDialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.courses$ = this.coursesService.getAllCourses();
  }

  onCreateNewCourse() {
    let matDialogRef = this.matDialog.open(NewCourseDialogComponent, {
      data: {
        dialogTitle: 'Add a New Course',
        button: 'Add',
      },
      disableClose: true,
    });
  }
}
