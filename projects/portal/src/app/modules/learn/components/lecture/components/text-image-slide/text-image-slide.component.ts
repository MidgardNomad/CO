import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ss } from 'DAL';

@Component({
  selector: 'app-text-image-slide',
  templateUrl: './text-image-slide.component.html',
  styleUrls: ['./text-image-slide.component.scss'],
})
export class TextImageSlideComponent {
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
