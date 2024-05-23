import {
  Component,
  OnInit,
  NgZone,
  Renderer2 as Renderer,
  ElementRef,
  ViewChild,
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

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userDoc: User;
  @ViewChild('profile') profile: ElementRef;
  @ViewChild('spinner') spinner: ElementRef;
  constructor(
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private renderer: Renderer,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      this.userDoc = data['userData'];
    });
    this.router.events.subscribe((event) => {
      this.navigationInterceptor(event);
    });
  }

  // Utilities
  private navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.ngZone.runOutsideAngular(() => {
        this.renderer.setStyle(this.profile.nativeElement, 'opacity', '0.8');
      });
      this.ngZone.runOutsideAngular(() => {
        this.renderer.setStyle(
          this.spinner.nativeElement,
          'display',
          'initial'
        );
      });
    }
    if (event instanceof NavigationEnd) {
      this.hideSpinner();
    }
    if (event instanceof NavigationCancel) {
      this.hideSpinner();
    }
    if (event instanceof NavigationError) {
      this.hideSpinner();
    }
  }

  private hideSpinner(): void {
    this.ngZone.runOutsideAngular(() => {
      this.renderer.setStyle(this.profile.nativeElement, 'opacity', '1');
    });
    this.ngZone.runOutsideAngular(() => {
      this.renderer.setStyle(this.spinner.nativeElement, 'display', 'none');
    });
  }
}
