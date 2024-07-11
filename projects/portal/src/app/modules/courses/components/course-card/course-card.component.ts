import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course, CoursesService, UsersService, User, CourseLevel } from 'DAL';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent implements OnInit, OnDestroy {
  @Input() course: Course;
  user: User;
  firstChapterID: string;
  firstLectureID: string;
  hideCourseCard = false;

  //Component Subscriptions
  coursesServiceChapterIDSub: Subscription;
  coursesServiceLectureIDSub: Subscription;
  usersServiceSub = new Subscription();

  constructor(
    private usersService: UsersService,
    private router: Router,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    if (this.usersService.userDoc !== null) {
      this.usersServiceSub = this.usersService.userDoc.subscribe((userData) => {
        this.user = userData;
        for (let course of userData.courseList) {
          if (course.courseId === this.course.id) {
            this.hideCourseCard = true;
          }
        }
      });
    }
    this.coursesServiceChapterIDSub = this.coursesService
      .getFirstChapter(this.course.id)
      .subscribe((chapterID) => {
        this.firstChapterID = chapterID;
        this.coursesServiceLectureIDSub = this.coursesService
          .getFirstLecture(this.course.id, chapterID)
          .subscribe((lectureID) => {
            this.firstLectureID = lectureID;
          });
      });
  }

  async enroll(course: Course) {
    try {
      await this.usersService.enrollInCourse(this.user.id, course.id, course);
      const userCourseLevel: CourseLevel = {
        courseId: course.id,
        chapterLevel: [
          {
            chapterId: this.firstChapterID,
            finished: null,
            lectureLevel: [{ lectureId: this.firstLectureID, finished: null }],
          },
        ],
      };
      this.user.courseList.push(userCourseLevel);
      await this.usersService.addCourseLevelToUserDoc(
        this.user.id,
        this.user.courseList
      );
      this.router.navigate(['/learn/course', course.id]);
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy(): void {
    this.coursesServiceChapterIDSub.unsubscribe();
    this.coursesServiceLectureIDSub.unsubscribe();
    this.usersServiceSub.unsubscribe();
  }
}
