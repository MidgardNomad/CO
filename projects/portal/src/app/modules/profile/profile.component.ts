import {
  Component,
  OnInit,
  NgZone,
  Renderer2 as Renderer,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import {
  ActivatedRoute,
  Data,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationError,
  NavigationCancel,
  Router,
} from '@angular/router';
import { User } from 'projects/dal/src/lib/models/user/user';
import { loadingAnimation } from '../../shared/functions/loadingAnimation';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userDoc = <User>{};
  hasUserLoaded = false;
  @ViewChild('mainProfileBody') mainProfileBody: ElementRef;
  @ViewChild('spinner') spinner: ElementRef;
  loadingAnimation = loadingAnimation();
  constructor(
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private renderer: Renderer,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      this.userDoc = data['userData'];
      if (this.userDoc.id == null) {
        this.hasUserLoaded = false;
      } else this.hasUserLoaded = true;
    });
  }
}
