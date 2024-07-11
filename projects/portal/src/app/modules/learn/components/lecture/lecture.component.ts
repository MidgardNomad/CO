import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LearnService, Ss, Lecture, UsersService } from 'DAL';
import { UIComponentsService } from 'projects/portal/src/app/services/ui-components.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.scss'],
})
export class LectureComponent implements OnInit, OnDestroy {
  //Properties
  //=========================
  progress = 0;
  indicator = `${this.progress}%`;
  activeSlide: Ss;
  disableToNextSlide = false;
  disableToPreviousSlide = true;
  slides: Ss[] = [];
  lecture: Lecture;
  nextLectureID: string;
  //=========================

  //Subs
  //======================
  learnServiceActiveLecSub: Subscription;
  learnServiceNextLecSub: Subscription;
  //======================

  constructor(
    private uiCompService: UIComponentsService,
    private route: ActivatedRoute,
    private router: Router,
    private learnService: LearnService,
    private usersService: UsersService
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
  //==================================

  ngOnInit(): void {
    this.activeSlide = this.slides[0];
    if (this.lecture === null) {
      this.learnServiceActiveLecSub = this.learnService
        .getSingleLectureByID(
          this.route.snapshot.paramMap.get('courseID'),
          this.route.snapshot.paramMap.get('chapterID'),
          this.route.snapshot.paramMap.get('lectureID')
        )
        .subscribe((currentLecture) => {
          this.lecture = currentLecture;
          this.learnServiceNextLecSub = this.learnService
            .getNextLectureID(
              this.route.snapshot.paramMap.get('courseID'),
              this.route.snapshot.paramMap.get('chapterID'),
              currentLecture.seqNo + 1
            )
            .subscribe((nextLecture) => {
              this.nextLectureID = nextLecture[0];
            });
        });
    } else {
      this.learnServiceNextLecSub = this.learnService
        .getNextLectureID(
          this.route.snapshot.paramMap.get('courseID'),
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

  finishLecture() {
    console.log('Finish Lecture');
  }

  ngOnDestroy(): void {
    if (this.learnServiceActiveLecSub) {
      this.learnServiceActiveLecSub.unsubscribe();
    }
    this.learnServiceNextLecSub.unsubscribe();
    this.uiCompService.hideHeaderAndFooter.next(true);
  }
}
