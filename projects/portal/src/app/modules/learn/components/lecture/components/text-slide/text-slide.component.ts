import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ss } from 'DAL';

@Component({
  selector: 'app-text-slide',
  templateUrl: './text-slide.component.html',
  styleUrls: ['./text-slide.component.scss'],
})
export class TextSlideComponent {
  //Components Inputs & Outputs
  //===============
  @Input() slide: Ss;
  @Input() isLastSlide: boolean;
  @Output() next = new EventEmitter();
  @Output() finish = new EventEmitter();
  //===============

  continue() {
    this.next.emit();
  }
  onFinish() {
    this.finish.emit();
  }
}
