import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddSlideDialogComponent } from './add-slide-dialog/add-slide-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService, Ss } from 'DAL';
import { Subscription } from 'rxjs';
import { DeleteDialogComponent } from 'projects/admin/src/app/modal/delete-dialog/delete-dialog.component';
import { EditSlideDialogComponent } from './edit-slide-dialog/edit-slide-dialog.component';
import { SlideData } from './types/slideData';

// Type Definitions

@Component({
  selector: 'app-lectures',
  templateUrl: './lectures.component.html',
  styleUrls: ['./lectures.component.scss'],
})
export class LecturesComponent implements OnInit, OnDestroy {
  //==========================================================================
  //Properties
  serviceSub: Subscription;
  deleteDialogSub = new Subscription();
  courseID: string;
  chapterID: string;
  lectureID: string;
  slides: Ss[] = [];
  activeSlide = {} as Ss;
  numberOfSlides: number;
  toNextSlideDisabled: boolean;
  toPreviousSlideDisabled: boolean;
  //==========================================================================

  constructor(
    private matDialog: MatDialog,
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private router: Router
  ) {}
  //==========================================================================
  //Utilities:
  private navButtonDisplay(currentSlide: number, numOfSlides: number) {
    if (this.slides.length === 0 || this.slides.length === 1) {
      this.toNextSlideDisabled = true;
      this.toPreviousSlideDisabled = true;
    } else if (currentSlide === numOfSlides - 1) {
      this.toNextSlideDisabled = true;
      this.toPreviousSlideDisabled = false;
    } else if (currentSlide > 0 && currentSlide < numOfSlides) {
      this.toNextSlideDisabled = false;
      this.toPreviousSlideDisabled = false;
    } else if (currentSlide === 0) {
      this.toNextSlideDisabled = false;
      this.toPreviousSlideDisabled = true;
    }
  }

  private openEditSlideDialogWithData(
    slideId: string,
    slideType: string,
    data: SlideData
  ) {
    this.matDialog.open(EditSlideDialogComponent, {
      disableClose: true,
      width: '500px',
      data: {
        slideId,
        slideType,
        ...data,
      },
    });
  }
  //==========================================================================
  //Get The Slides inside NgOninit (Move This functionality to a resolver OR use a loading a spinner)
  ngOnInit(): void {
    this.toNextSlideDisabled = true;
    this.toPreviousSlideDisabled = true;
    this.courseID = this.route.snapshot.paramMap.get('id');
    this.chapterID = this.route.snapshot.paramMap.get('chapterID');
    this.lectureID = this.route.snapshot.paramMap.get('lectureID');
    this.serviceSub = this.coursesService
      .getAllSlides(this.courseID, this.chapterID, this.lectureID)
      .subscribe((slidesList) => {
        this.numberOfSlides = slidesList.length;
        this.slides = slidesList;
        this.route.queryParams.subscribe((p) => {
          if (+p['s'] < 0 || +p['s'] > this.numberOfSlides) {
            this.router.navigate([], {
              relativeTo: this.route,
              queryParams: { s: 0 },
              queryParamsHandling: 'merge',
            });
          }
          this.activeSlide = this.slides[Number(p['s'])];
          this.navButtonDisplay(
            this.slides.indexOf(this.activeSlide),
            this.numberOfSlides
          );
        });
      });
  }
  //==========================================================================
  //Manipulate Slides (Create/Update/Delete)
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

  //Edit Individual Slides
  onEditSlide() {
    this.openEditSlideDialogWithData(
      this.activeSlide.id,
      this.activeSlide.type,
      { text: 'Hi' }
    );
  }

  //Delete and Re-arrange slides
  onDeleteSlide() {
    this.deleteDialogSub = this.matDialog
      .open(DeleteDialogComponent, {
        data: {
          messageTail: 'Slide',
        },
      })
      .afterClosed()
      .subscribe(async (result) => {
        if (result) {
          try {
            if (
              this.slides.indexOf(this.activeSlide) ===
              this.slides.length - 1
            ) {
              if (this.slides.length > 1) {
                this.onToPreviousSlide();
              } else {
                this.slides.splice(0);
              }
              await this.coursesService.deleteSlide(
                this.courseID,
                this.chapterID,
                this.lectureID,
                this.activeSlide.id
              );
            } else {
              let activeSlideSeqNo = this.activeSlide.seqNo;
              await this.coursesService.deleteSlide(
                this.courseID,
                this.chapterID,
                this.lectureID,
                this.activeSlide.id
              );
              //TODO: Find a better way to handle re-ordering the lectures.
              for (let [i, slide] of this.slides.entries()) {
                if (slide.seqNo > activeSlideSeqNo) {
                  await this.coursesService.editSlide(
                    this.courseID,
                    this.chapterID,
                    this.lectureID,
                    slide.id,
                    { seqNo: i }
                  );
                }
              }
            }
          } catch (error) {
            console.log(error);
          }
        }
      });
  }

  //=====================================
  //Navigate The Slides
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
  //=====================================

  ngOnDestroy(): void {
    this.serviceSub.unsubscribe();
    this.deleteDialogSub.unsubscribe();
  }
}
