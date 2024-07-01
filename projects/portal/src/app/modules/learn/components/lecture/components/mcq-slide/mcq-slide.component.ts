import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ss } from 'DAL';

@Component({
  selector: 'app-mcq-slide',
  templateUrl: './mcq-slide.component.html',
  styleUrls: ['./mcq-slide.component.scss'],
})
export class McqSlideComponent {
  isAnswerCorrect = false;
  isAnswerWrong = false;
  @Input() slide: Ss;
  @Output() continue = new EventEmitter();

  onCheckAnswer(form: NgForm) {
    if (
      this.slide.options.indexOf(form.value.option) === this.slide.mcqAnswer
    ) {
      this.isAnswerCorrect = true;
    } else {
      console.log('wrong');
      this.isAnswerWrong = true;
    }
  }

  onContinue() {
    this.continue.emit();
  }
}
