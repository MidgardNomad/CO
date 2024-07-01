import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ss } from 'DAL';

@Component({
  selector: 'app-fill-slide',
  templateUrl: './fill-slide.component.html',
  styleUrls: ['./fill-slide.component.scss'],
})
export class FillSlideComponent {
  isAnswerWrong = false;
  isAnswerCorrect = false;
  @Input() slide: Ss;
  @Output() next = new EventEmitter();

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
}
