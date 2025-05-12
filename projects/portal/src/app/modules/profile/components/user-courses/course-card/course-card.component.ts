import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course, CourseLevel, LearnService, UsersService } from 'DAL';
import { showSnackbar } from 'projects/portal/src/app/shared/functions/showsnackbar';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent implements OnInit {
  @Input() course: Course;
  @Input() userCourseList: CourseLevel[];
  @Output() enrolling = new EventEmitter<boolean>();

  userId: string;
  isLoading = false;
  nextChapterID: string;
  firstLectureID: string;
  isCourseActive = false;
  isCourseInProgress = false;
  isCourseFinished = false;
  isCourseEnrolled = false;

  showSnackbar = showSnackbar();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private learnService: LearnService,
    private usersService: UsersService
  ) {}

  private getFirstChapterAndLecture() {
    this.learnService
      .getNextChapterID(this.course.id, 1)
      .pipe(
        tap((chapterID) => {
          this.nextChapterID = chapterID;
        }),
        switchMap((chapterID) => {
          return this.learnService.getFirstLectureIDOfChapter(
            this.course.id,
            chapterID
          );
        })
      )
      .subscribe((lectureIDs) => {
        this.firstLectureID = lectureIDs[0];
      });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('uid');
    const userProgressInCourse = this.userCourseList.find(
      (course) => course.courseId === this.course.id
    );
    if (userProgressInCourse && !userProgressInCourse.finished) {
      this.isCourseActive = true;
      this.isCourseInProgress = true;
      this.isCourseEnrolled = true;
    } else if (userProgressInCourse && userProgressInCourse.finished) {
      this.isCourseActive = true;
      this.isCourseFinished = true;
      this.isCourseEnrolled = true;
    }
    if (userProgressInCourse?.chapterLevel.length === 0) {
      this.isCourseEnrolled = false;
      this.getFirstChapterAndLecture();
    }
  }

  async navigateToLearn() {
    try {
      if (this.isCourseEnrolled) {
        this.isLoading = true;
        this.enrolling.emit(true);
        this.userCourseList
          .find((courseLevel) => courseLevel.courseId === this.course.id)
          .chapterLevel.push({
            chapterId: this.nextChapterID,
            finished: null,
            lectureLevel: [],
          });
        console.log(
          this.userCourseList.find(
            (courseLevel) => courseLevel.courseId === this.course.id
          )
        );
        this.userCourseList
          .find((courseLevel) => courseLevel.courseId === this.course.id)
          .chapterLevel.find(
            (chpaterLevel) => chpaterLevel.chapterId === this.nextChapterID
          )
          .lectureLevel.push({
            lectureId: this.firstLectureID,
            finished: null,
          });
        console.log(this.userCourseList);
        await this.usersService.addCourseLevelToUserDoc(
          this.userId,
          this.userCourseList
        );
      }
      console.log(this.userCourseList);
      this.enrolling.emit(false);
      this.isLoading = false;
      this.router.navigate(['learn/course', this.course.id]);
    } catch (error) {
      this.enrolling.emit(false);
      this.isLoading = false;
      this.showSnackbar(
        'Something went wrong! Please, try again.',
        'fail-snackbar'
      );
    }
  }
}
