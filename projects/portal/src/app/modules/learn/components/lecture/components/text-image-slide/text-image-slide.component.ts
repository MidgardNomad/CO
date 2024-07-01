import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ss } from 'DAL';

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
  //===============

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

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
