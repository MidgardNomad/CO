import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Ss } from 'DAL';
import { UIComponentsService } from 'projects/portal/src/app/services/ui-components.service';

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
  allowContinue = false;
  //===================

  //Component Inputs & Outputs
  //===================
  @Input() slide: Ss;
  @Input() isLastSlide: boolean;
  @Output() next = new EventEmitter();
  @Output() finish = new EventEmitter();
  //===================

  constructor(private uiService: UIComponentsService) {}

  ngOnInit(): void {}

  onCheck(qForm: NgForm) {
    if (qForm.value.answer === this.slide.qAnswer) {
      this.isAnswerCorrect = true;
      this.allowContinue = true;
      this.isAnswerWrong = false;
    } else {
      this.isAnswerWrong = true;
    }
  }

  continue() {
    this.next.emit();
  }
  onFinish() {
    this.finish.emit();
  }
}
