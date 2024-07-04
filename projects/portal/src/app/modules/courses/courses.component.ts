import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoursesService, Course, CourseLevel, UsersService, User } from 'DAL';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit, OnDestroy {
  coursesServiceSub: Subscription;
  constructor(private coursesService: CoursesService) {}
  courses: Course[];
  userCoursesList;

  ngOnInit() {
    this.coursesServiceSub = this.coursesService
      .getAllCourses()
      .subscribe((data) => {
        this.courses = data;
      });
  }

  ngOnDestroy() {
    this.coursesServiceSub.unsubscribe();
  }
}
