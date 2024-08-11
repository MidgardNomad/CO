import { Component, OnInit } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Course, CoursesService } from 'DAL';
import { MatDialog } from '@angular/material/dialog';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements OnInit {
  courses: Course[];
  constructor(
    private coursesService: CoursesService,
    private matDialog: MatDialog,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.coursesService.getAllCourses().subscribe((courses) => {
      this.courses = courses;
    });
  }

  onCreateNewCourse() {
    this.matDialog.open(CourseDialogComponent, {
      data: {
        dialogTitle: 'Add a New Course',
        button: 'Add',
        seqNo: this.courses.length,
      },
      disableClose: true,
    });
  }
}
