import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ss } from 'DAL';

@Component({
  selector: 'app-mcq-slide',
  templateUrl: './mcq-slide.component.html',
  styleUrls: ['./mcq-slide.component.scss'],
})
export class McqSlideComponent {
  //Components Properties
  //===============
  isAnswerCorrect = false;
  isAnswerWrong = false;
  allowContinue = false;
  //===============

  //Components Inputs & Outputs
  //===============
  @Input() slide: Ss;
  @Input() isLastSlide: boolean;
  @Output() next = new EventEmitter();
  @Output() finish = new EventEmitter();
  @Output() correctAnswer = new EventEmitter();

  //===============

  onCheckAnswer(form: NgForm) {
    if (
      this.slide.options.indexOf(form.value.option) === this.slide.mcqAnswer
    ) {
      this.isAnswerCorrect = true;
      this.allowContinue = true;
      this.isAnswerWrong = false;
      this.correctAnswer.emit();
    } else {
      this.isAnswerWrong = true;
    }
  }

  onContinue() {
    this.next.emit();
  }

  onFinish() {
    this.finish.emit();
  }
}
