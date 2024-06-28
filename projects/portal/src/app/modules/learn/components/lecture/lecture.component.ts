import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ss, SsType } from 'DAL';
import { UIComponentsService } from 'projects/portal/src/app/services/ui-components.service';

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.scss'],
})
export class LectureComponent implements OnInit, OnDestroy {
  progress = 0;
  indicator = `${this.progress}%`;
  activeSlide: Ss;
  disableToNextSlide = false;
  disableToPreviousSlide = true;
  slides: Ss[] = [
    { type: SsType.Text, text: 'text', seqNo: 0 },
    {
      type: SsType.TextImage,
      seqNo: 1,
      text: 'test image',
      image: '../../../../../assets/images/HTMLCSSJS.png',
    },
    {
      type: SsType.MCQ,
      seqNo: 2,
      question: 'What Does HTML Stand For?',
      mcqAnswer: 0,
      options: ['HyperText Markup Language', 'hybrid Track Madeup Language'],
    },
    {
      type: SsType.QFill,
      seqNo: 3,
      question: '<p>Hello, World....',
      qAnswer: '</p>',
    },
  ];

  constructor(
    private uiCompService: UIComponentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeSlide = this.slides[0];
    this.uiCompService.hideHeaderAndFooter.next(false);
    this.route.queryParams.subscribe((slideIndex) => {
      if (+slideIndex['s'] < 0 || +slideIndex['s'] > this.slides.length - 1) {
        const queryParams = { s: 0 };
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams,
          queryParamsHandling: 'merge',
        });
      } else console.log(this.slides[+slideIndex['s']]);
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

  ngOnDestroy(): void {
    this.uiCompService.hideHeaderAndFooter.next(true);
  }
}
