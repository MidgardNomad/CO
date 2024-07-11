import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Course,
  CoursesService,
  UsersService,
  Chapter,
  ChapterLevel,
} from 'DAL';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit, OnDestroy {
  course: Course;
  chapters: Chapter[];
  userProgress: ChapterLevel[];
  coursesServiceSub: Subscription;
  usersServiceSub: Subscription;
  showCourseSection = true;
  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((routeData) => {
      this.course = routeData['course'];
    });
    this.coursesServiceSub = this.coursesService
      .getChapters(this.route.snapshot.paramMap.get('courseID'))
      .subscribe((chapters) => {
        this.chapters = chapters;
      });
    this.usersServiceSub = this.usersService.userDoc.subscribe((userDoc) => {
      const userProgressObj = userDoc.courseList.find(
        (course) => this.course.id === course.courseId
      );
      if (!userProgressObj) {
        this.showCourseSection = false;
        window.location.reload();
      }
      this.userProgress = userProgressObj.chapterLevel;
    });
  }

  getChapterProgress(chapter: Chapter) {
    return (
      this.userProgress.find(
        (chapterProgress) => chapter.id === chapterProgress.chapterId
      ) || null
    );
  }

  ngOnDestroy(): void {
    this.coursesServiceSub.unsubscribe();
    this.usersServiceSub.unsubscribe();
  }
}
