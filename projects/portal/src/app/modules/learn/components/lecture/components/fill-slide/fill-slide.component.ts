import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Ss } from 'DAL';

@Component({
  selector: 'app-fill-slide',
  templateUrl: './fill-slide.component.html',
  styleUrls: ['./fill-slide.component.scss'],
})
export class FillSlideComponent implements OnInit {
  //Component Properties
  //===================
  isAnswerWrong = false;
  isAnswerCorrect = false;
  //===================

  //Component Inputs & Outputs
  //===================
  @Input() slide: Ss;
  @Input() isLastSlide: boolean;
  @Output() next = new EventEmitter();
  //===================

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  onCheck(qForm: NgForm) {
    if (qForm.value.answer === this.slide.qAnswer) {
      this.isAnswerCorrect = true;
    } else {
      this.isAnswerWrong = true;
    }
  }

  continue() {
    this.next.emit();
  }
  onFinish() {
    this.router.navigate([
      'learn/course',
      this.route.snapshot.paramMap.get('courseID'),
    ]);
  }
}
