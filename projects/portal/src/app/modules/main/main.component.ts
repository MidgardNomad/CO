import { Component, OnDestroy, OnInit } from '@angular/core';
import { UIComponentsService } from '../../services/ui-components.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  showHeaderAndFooter = true;
  uiServiceSub: Subscription;
  constructor(private uiService: UIComponentsService) {}

  ngOnInit(): void {
    this.uiService.hideHeaderAndFooter.subscribe((hide) => {
      this.showHeaderAndFooter = hide;
    });
  }

  ngOnDestroy(): void {
    this.uiServiceSub.unsubscribe();
  }
}
