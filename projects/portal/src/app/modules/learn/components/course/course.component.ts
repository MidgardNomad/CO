import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Course,
  CoursesService,
  UsersService,
  Chapter,
  ChapterLevel,
  LearnService,
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
  learnServiceSub: Subscription;
  showCourseSection = true;
  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private usersService: UsersService,
    private learnService: LearnService
  ) {}

  ngOnInit(): void {
    this.course = this.route.snapshot.data['course'];
    this.coursesServiceSub = this.coursesService
      .getChapters(this.route.snapshot.paramMap.get('courseID'))
      .subscribe((chapters) => {
        this.chapters = chapters;
      });
    this.usersServiceSub = this.usersService.userDoc.subscribe((userDoc) => {
      const userProgressObj = userDoc.courseList.find(
        (course) => this.course.id === course.courseId
      );
      this.userProgress = userProgressObj?.chapterLevel;
      if (userProgressObj.finished !== null) {
        this.learnServiceSub = this.learnService
          .getNextCourseID(this.course.seqNo + 1)
          .subscribe((courseID) => {
            try {
              const nextCourseProgress = userDoc.courseList.find(
                (course) => course.courseId === courseID[0]
              );
              if (nextCourseProgress === undefined) {
                userDoc.courseList.push({
                  courseId: courseID[0],
                  finished: null,
                  chapterLevel: [],
                });
                this.learnService
                  .getNextChapterID(courseID[0], 1)
                  .subscribe((chapterID) => {
                    userDoc.courseList
                      .find((course) => course.courseId === courseID[0])
                      .chapterLevel.push({
                        chapterId: chapterID,
                        finished: null,
                        lectureLevel: [],
                      });

                    this.learnService
                      .getFirstLectureIDOfChapter(courseID[0], chapterID)
                      .subscribe(async (lecture) => {
                        userDoc.courseList
                          .find((course) => course.courseId === courseID[0])
                          .chapterLevel.find(
                            (chapter) => chapter.chapterId === chapterID
                          )
                          .lectureLevel.push({
                            lectureId: lecture[0],
                            finished: null,
                          });
                        await this.usersService.addCourseLevelToUserDoc(
                          userDoc.id,
                          userDoc.courseList
                        );
                      });
                  });
              }
            } catch (error) {
              console.log(error);
            }
          });
      }
    });
  }

  getChapterProgress(chapter: Chapter) {
    return (
      this.userProgress?.find(
        (chapterProgress) => chapter.id === chapterProgress.chapterId
      ) || null
    );
  }

  ngOnDestroy(): void {
    this.coursesServiceSub.unsubscribe();
    this.usersServiceSub.unsubscribe();
    if (this.learnServiceSub) this.learnServiceSub.unsubscribe();
  }
}
