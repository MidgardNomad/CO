import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ss } from 'DAL';
import { UIComponentsService } from 'projects/portal/src/app/services/ui-components.service';

@Component({
  selector: 'app-text-image-slide',
  templateUrl: './text-image-slide.component.html',
  styleUrls: ['./text-image-slide.component.scss'],
})
export class TextImageSlideComponent implements OnInit {
  //Components Inputs & Outputs
  //===============
  @Input() slide: Ss;
  @Input() isLastSlide: boolean;
  @Output() next = new EventEmitter();
  @Output() finish = new EventEmitter();
  //===============

  constructor(private uiService: UIComponentsService) {}

  ngOnInit(): void {}

  continue() {
    this.next.emit();
  }

  onFinish() {
    this.finish.emit();
  }
}
