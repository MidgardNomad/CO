import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ss } from 'DAL';
import { UIComponentsService } from 'projects/portal/src/app/services/ui-components.service';

@Component({
  selector: 'app-mcq-slide',
  templateUrl: './mcq-slide.component.html',
  styleUrls: ['./mcq-slide.component.scss'],
})
export class McqSlideComponent implements OnInit {
  //Components Properties
  //===============
  isAnswerCorrect = false;
  isAnswerWrong = false;
  //===============

  //Components Inputs & Outputs
  //===============
  @Input() slide: Ss;
  @Input() isLastSlide: boolean;
  @Output() next = new EventEmitter();
  @Output() finish = new EventEmitter();
  //===============

  constructor(private uiService: UIComponentsService) {}

  ngOnInit(): void {}

  onCheckAnswer(form: NgForm) {
    if (
      this.slide.options.indexOf(form.value.option) === this.slide.mcqAnswer
    ) {
      this.isAnswerCorrect = true;
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
