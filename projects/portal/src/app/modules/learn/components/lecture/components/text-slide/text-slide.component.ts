import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Ss } from 'DAL';
import { UIComponentsService } from 'projects/portal/src/app/services/ui-components.service';

@Component({
  selector: 'app-text-slide',
  templateUrl: './text-slide.component.html',
  styleUrls: ['./text-slide.component.scss'],
})
export class TextSlideComponent implements OnInit {
  //Components Inputs & Outputs
  //===============
  @Input() slide: Ss;
  @Input() isLastSlide: boolean;
  @Output() next = new EventEmitter();
  //===============

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private uiService: UIComponentsService
  ) {}

  ngOnInit(): void {}

  continue() {
    this.next.emit();
  }
  onFinish() {
    this.router.navigate([
      'learn/course',
      this.route.snapshot.paramMap.get('courseID'),
    ]);
    this.uiService.hideHeaderAndFooter.next(true);
  }
}
