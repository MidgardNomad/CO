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
  //===============

  constructor(private router: Router, private route: ActivatedRoute) {}

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
    this.router.navigate([
      'learn/course',
      this.route.snapshot.paramMap.get('courseID'),
    ]);
  }
}
