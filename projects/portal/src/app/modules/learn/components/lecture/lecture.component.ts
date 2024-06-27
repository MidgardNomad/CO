import { Component, OnDestroy, OnInit } from '@angular/core';
import { UIComponentsService } from 'projects/portal/src/app/services/ui-components.service';

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.scss'],
})
export class LectureComponent implements OnInit, OnDestroy {
  constructor(private uiCompService: UIComponentsService) {}

  ngOnInit(): void {
    this.uiCompService.hideHeaderAndFooter.next(false);
  }

  ngOnDestroy(): void {
    this.uiCompService.hideHeaderAndFooter.next(true);
  }
}
