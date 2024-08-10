import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Course,
  CoursesService,
  UsersService,
  Chapter,
  ChapterLevel,
  LearnService,
  User,
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
  userDoc: User;
  coursesServiceSub: Subscription;
  usersServiceSub: Subscription;
  learnServiceSub: Subscription;
  showCourseSection = true;
  finished: Date;
  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private usersService: UsersService,
    private learnService: LearnService
  ) {}

  ngOnInit(): void {
    this.coursesServiceSub = this.coursesService
      .getChapters(this.route.snapshot.paramMap.get('courseID'))
      .subscribe((chapters) => {
        this.chapters = chapters;
      });

    this.course = this.route.snapshot.data['course'];
    this.userDoc = this.route.snapshot.data['userProgress'];
    this.userProgress = this.userDoc.courseList.find(
      (courseLevel) =>
        courseLevel.courseId === this.route.snapshot.paramMap.get('courseID')
    ).chapterLevel;

    console.log(this.userProgress);
    this.finished = this.userDoc.courseList.find(
      (courseLevel) =>
        courseLevel.courseId === this.route.snapshot.paramMap.get('courseID')
    ).finished;

    if (this.finished) {
      console.log('enroll in the next course');
      this.learnService
        .getNextCourseID(this.course.seqNo + 1)
        .subscribe(async (courseID) => {
          try {
            const nextCourseProgress = this.userDoc.courseList.find(
              (courseLevel) => courseID[0] === courseLevel.courseId
            );
            if (!nextCourseProgress) {
              console.log('Adding next chapter');
              this.userDoc.courseList.push({
                courseId: courseID[0],
                finished: null,
                chapterLevel: [],
              });
              await this.usersService.addCourseLevelToUserDoc(
                this.userDoc.id,
                this.userDoc.courseList
              );
            }
          } catch (error) {
            console.log(error);
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.coursesServiceSub.unsubscribe();
    if (this.learnServiceSub) this.learnServiceSub.unsubscribe();
  }
}
