import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course, CoursesService, Chapter } from 'DAL';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit, OnDestroy {
  course: Course;
  chapters: Chapter[];
  serviceSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((courseData) => {
      this.course = courseData['course'];
    });
    this.serviceSub = this.coursesService
      .getChapters(this.route.snapshot.paramMap.get('courseID'))
      .subscribe((chapters) => {
        this.chapters = chapters;
      });
  }

  ngOnDestroy(): void {
    this.serviceSub.unsubscribe();
  }
}
