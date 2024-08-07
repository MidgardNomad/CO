import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  LearnService,
  Ss,
  Lecture,
  UsersService,
  CourseLevel,
  Chapter,
} from 'DAL';
import { CoursesService } from 'projects/dal/src/public-api';
import { UIComponentsService } from 'projects/portal/src/app/services/ui-components.service';
import { Subscription } from 'rxjs';
import { ConfirmQuitLectureComponent } from './components/confirm-quit-lecture/confirm-quit-lecture.component';

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.scss'],
})
export class LectureComponent implements OnInit, OnDestroy {
  //Properties
  //=========================
  //Template Properties
  progress = 0;
  indicator = `${this.progress}%`;
  activeSlide: Ss;
  disableToNextSlide = false;
  disableToPreviousSlide = true;
  slides: Ss[] = [];
  //Class properties
  private courseChapters: Chapter[];
  private chapterLectures: Lecture[];
  private courseID: string;
  private chapterID: string;
  private lectureID: string;
  private lecture: Lecture;
  private nextLectureID: string;
  private chapter: Chapter;
  private NextChapterID: string;
  private firstLectureIDOfNextChapter: string;
  private userID: string;
  private userCourseList: CourseLevel[];
  private userStreakDays: Date[];
  private userMaxStreak: number;
  private userCurrentStreak: number;
  //=========================

  //Subs
  //======================
  private learnServiceActiveLecSub: Subscription;
  private learnServiceNextLecSub: Subscription;
  private usersServiceSub: Subscription;
  private getAllLecturesSub: Subscription;
  private getAllChaptersSub: Subscription;
  private getCurrentChapterSub: Subscription;
  private getNextChapterIDSub: Subscription;
  private getNextFirstLectureIDofNextChapter: Subscription;
  //======================

  constructor(
    private uiCompService: UIComponentsService,
    private route: ActivatedRoute,
    private router: Router,
    private learnService: LearnService,
    private usersService: UsersService,
    private coursesService: CoursesService,
    private matDialog: MatDialog
  ) {
    this.lecture =
      this.router.getCurrentNavigation()?.extras?.state['activeLecture'] ||
      null;
  }

  //Class utilities
  //==================================
  private _navigateToFirstSlide() {
    const queryParams = { s: 0 };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  private navButtonDisplay(currentSlide: number, numberOfSlides: number) {
    if (this.slides.length === 1 || this.slides.length === 0) {
      this.disableToNextSlide = true;
      this.disableToPreviousSlide = true;
    } else if (currentSlide === numberOfSlides) {
      this.disableToNextSlide = true;
      this.disableToPreviousSlide = false;
    } else if (currentSlide > 0 && currentSlide < numberOfSlides) {
      this.disableToNextSlide = false;
      this.disableToPreviousSlide = false;
    } else if (currentSlide === 0) {
      this.disableToNextSlide = false;
      this.disableToPreviousSlide = true;
    }
  }

  private getLectureLevel() {
    return this.userCourseList
      .find((course) => course.courseId === this.courseID)
      .chapterLevel.find((chapter) => chapter.chapterId === this.chapterID)
      .lectureLevel;
  }

  private getChapterLevel() {
    return this.userCourseList.find(
      (course) => course.courseId === this.courseID
    ).chapterLevel;
  }

  private getAllChapters() {
    this.getAllChaptersSub = this.coursesService
      .getChapters(this.courseID)
      .subscribe((chapters) => (this.courseChapters = chapters));
  }

  private getCurrentChapter() {
    this.getCurrentChapterSub = this.learnService
      .getSigleChapter(this.courseID, this.chapterID)
      .subscribe((chapter) => {
        this.chapter = chapter;
        this.getNextChapterIDSub = this.learnService
          .getNextChapterID(this.courseID, chapter.seqNo + 1)
          .subscribe((chpaterId) => {
            this.NextChapterID = chpaterId;
            this.getNextFirstLectureIDofNextChapter = this.learnService
              .getFirstLectureIDOfChapter(this.courseID, this.NextChapterID)
              .subscribe(
                (lectureId) => (this.firstLectureIDOfNextChapter = lectureId[0])
              );
          });
      });
  }

  private getAllLectures() {
    this.getAllLecturesSub = this.coursesService
      .getAllLectures(this.courseID, this.chapterID)
      .subscribe((lectures) => (this.chapterLectures = lectures));
  }

  private getUserIDCourseList() {
    this.usersServiceSub = this.usersService.userDoc.subscribe((userDoc) => {
      this.userID = userDoc.id;
      this.userCourseList = userDoc.courseList;
      this.userStreakDays = userDoc.streakDays;
      this.userCurrentStreak = userDoc.currentStreak;
      this.userMaxStreak = userDoc.maxStreak;
    });
  }

  private getRouteIDs() {
    this.courseID = this.route.snapshot.paramMap.get('courseID');
    this.chapterID = this.route.snapshot.paramMap.get('chapterID');
    this.lectureID = this.route.snapshot.paramMap.get('lectureID');
  }

  private async updateUserProgress(
    userID: string,
    userCourseList: CourseLevel[]
  ) {
    try {
      await this.usersService.addCourseLevelToUserDoc(userID, userCourseList);
    } catch (error) {
      console.log(error);
    }
  }

  private async updateUserStreak(
    userID: string,
    streakDays: Date[],
    currentStreak: number,
    maxStreak: number
  ) {
    try {
      if (streakDays) {
        const today = new Date().toISOString().substring(0, 10);
        const streakDay = streakDays.find((streakDay) => {
          const day = new Date(
            new Date((streakDay as any).seconds * 1000).getTime()
          )
            .toISOString()
            .substring(0, 10);
          return today === day;
        });

        if (streakDay === undefined) {
          streakDays.push(new Date());

          currentStreak++;

          maxStreak = currentStreak > maxStreak ? currentStreak : maxStreak;
        }
      } else {
        streakDays.push(new Date());
        maxStreak++;
        currentStreak++;
      }

      await this.usersService.updateUserStearkDays(
        userID,
        streakDays,
        maxStreak,
        currentStreak
      );
    } catch (error) {
      console.log(error);
    }
  }
  //==================================

  ngOnInit(): void {
    this.getUserIDCourseList();
    this.getRouteIDs();
    this.getAllChapters();
    this.getAllLectures();
    this.getCurrentChapter();
    this.activeSlide = this.slides[0];
    if (this.lecture === null) {
      this.learnServiceActiveLecSub = this.learnService
        .getSingleLectureByID(this.courseID, this.chapterID, this.lectureID)
        .subscribe((currentLecture) => {
          this.lecture = currentLecture;

          this.learnServiceNextLecSub = this.learnService
            .getNextLectureID(
              this.courseID,
              this.chapterID,
              currentLecture.seqNo + 1
            )
            .subscribe((nextLecture) => {
              this.nextLectureID = nextLecture[0];
            });
        });
    } else {
      this.learnServiceNextLecSub = this.learnService
        .getNextLectureID(
          this.courseID,
          this.route.snapshot.paramMap.get('chapterID'),
          this.lecture.seqNo + 1
        )
        .subscribe((nextLecture) => {
          this.nextLectureID = nextLecture[0];
        });
    }
    this.uiCompService.hideHeaderAndFooter.next(false);
    if (+this.route.snapshot.queryParamMap.get('s') !== 0) {
      this._navigateToFirstSlide();
    }
    this.slides = this.route.snapshot.data['slides'];
    this.route.queryParams.subscribe((slideIndex) => {
      if (+slideIndex['s'] < 0 || +slideIndex['s'] > this.slides.length - 1) {
        this._navigateToFirstSlide();
      } else {
        this.activeSlide = this.slides[+slideIndex['s']];
        this.navButtonDisplay(
          this.slides.indexOf(this.activeSlide),
          this.slides.length - 1
        );
      }
    });
  }

  onToNextSlide() {
    if (this.progress !== 100) {
      const queryParams = { s: +this.route.snapshot.queryParams['s'] + 1 };
      this.progress = this.progress + (1 / (this.slides.length - 1)) * 100;
      this.indicator = `calc(${this.progress}% - 6px)`;
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge',
      });
    }
  }

  onToPreviousSlide() {
    if (this.progress !== 0) {
      const queryParams = { s: +this.route.snapshot.queryParams['s'] - 1 };
      this.progress = this.progress - (1 / (this.slides.length - 1)) * 100;
      this.indicator = `calc(${this.progress}% - 6px)`;
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge',
      });
    }
  }

  onQuitLecture() {
    this.matDialog.open(ConfirmQuitLectureComponent, {
      data: { courseID: this.courseID },
    });
  }

  async finishLecture() {
    try {
      let lectureLevel = this.getLectureLevel();
      let chapterLevel = this.getChapterLevel();

      if (this.chapterLectures.length !== this.lecture.seqNo) {
        lectureLevel.find(
          (lecture) => lecture.lectureId === this.lectureID
        ).finished = new Date();

        lectureLevel.push({
          lectureId: this.nextLectureID,
          finished: null,
        });
      } else if (
        this.chapterLectures.length === this.lecture.seqNo &&
        this.courseChapters.length === this.chapter.seqNo
      ) {
        lectureLevel.find(
          (lecture) => this.lectureID === lecture.lectureId
        ).finished = new Date();
        chapterLevel.find((chapter) => this.chapterID === chapter.chapterId)
          .finished === new Date();
        chapterLevel.find(
          (chapter) => chapter.chapterId === this.chapterID
        ).finished = new Date();
        this.userCourseList.find(
          (course) => this.courseID === course.courseId
        ).finished = new Date();
      } else {
        lectureLevel.find(
          (lecture) => lecture.lectureId === this.lectureID
        ).finished = new Date();
        chapterLevel.find(
          (chapter) => chapter.chapterId === this.chapterID
        ).finished = new Date();

        chapterLevel.push({
          chapterId: this.NextChapterID,
          finished: null,
          lectureLevel: [
            {
              lectureId: this.firstLectureIDOfNextChapter,
              finished: null,
            },
          ],
        });
      }

      await this.updateUserProgress(this.userID, this.userCourseList);
      await this.updateUserStreak(
        this.userID,
        this.userStreakDays,
        this.userCurrentStreak,
        this.userMaxStreak
      );
      this.router.navigate(['/learn/course', this.courseID]);
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy(): void {
    if (this.learnServiceActiveLecSub) {
      this.learnServiceActiveLecSub.unsubscribe();
    }
    this.learnServiceNextLecSub.unsubscribe();
    this.usersServiceSub.unsubscribe();
    this.getAllChaptersSub.unsubscribe();
    this.getAllLecturesSub.unsubscribe();
    this.getCurrentChapterSub.unsubscribe();
    this.getNextChapterIDSub.unsubscribe();
    this.getNextFirstLectureIDofNextChapter.unsubscribe();
    this.uiCompService.hideHeaderAndFooter.next(true);
  }
}
