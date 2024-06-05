import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddSlideDialogComponent } from './add-slide-dialog/add-slide-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService, Ss } from 'DAL';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lectures',
  templateUrl: './lectures.component.html',
  styleUrls: ['./lectures.component.scss'],
})
export class LecturesComponent implements OnInit, OnDestroy {
  serviceSub: Subscription;
  routeQueryParamsSub: Subscription;
  courseID: string;
  chapterID: string;
  lectureID: string;
  slides: Ss[];
  activeSlide: Ss;
  numberOfSlides: number;
  toNextSlideDisabled: boolean;
  toPreviousSlideDisabled: boolean;
  constructor(
    private matDialog: MatDialog,
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private router: Router
  ) {}
  //==========================================================================
  //Utilities:
  private navButtonDisplay(currentSlide: number, numOfSlides: number) {
    if (currentSlide == numOfSlides) {
      this.toNextSlideDisabled = true;
      this.toPreviousSlideDisabled = false;
    } else if (currentSlide > 1 && currentSlide < numOfSlides) {
      this.toNextSlideDisabled = false;
      this.toPreviousSlideDisabled = false;
    } else if (currentSlide == 1) {
      this.toNextSlideDisabled = false;
      this.toPreviousSlideDisabled = true;
    }
  }
  //==========================================================================
  ngOnInit(): void {
    this.courseID = this.route.snapshot.paramMap.get('id');
    this.chapterID = this.route.snapshot.paramMap.get('chapterID');
    this.lectureID = this.route.snapshot.paramMap.get('lectureID');
    this.serviceSub = this.coursesService
      .getAllSlides(this.courseID, this.chapterID, this.lectureID)
      .subscribe((slidesList) => {
        this.numberOfSlides = slidesList.length;
        this.slides = slidesList;
        this.routeQueryParamsSub = this.route.queryParams.subscribe((p) => {
          this.navButtonDisplay(+p['s'], this.numberOfSlides);
          this.activeSlide = this.slides[p['s'] - 1];
        });
      });
  }
  onCreateNewSlide() {
    this.matDialog.open(AddSlideDialogComponent, {
      disableClose: true,
      width: '500px',
      data: {
        courseID: this.courseID,
        chapterID: this.chapterID,
        lectureID: this.lectureID,
        seqNo: this.numberOfSlides,
      },
    });
  }
  onToNextSlide() {
    const queryParams = { s: 1 + Number(this.route.snapshot.queryParams['s']) };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }
  onToPreviousSlide() {
    const queryParams = { s: Number(this.route.snapshot.queryParams['s']) - 1 };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  ngOnDestroy(): void {
    this.serviceSub.unsubscribe();
    this.routeQueryParamsSub.unsubscribe();
  }
}
