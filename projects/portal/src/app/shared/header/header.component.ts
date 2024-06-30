import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'DAL';
import { UIComponentsService } from '../../services/ui-components.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userDisplayName: string;
  userID: string;
  photoURL: string;
  userInfoCard: boolean;
  userCardOpacity = '0';

  //=====Service Subscriptions======
  uiServicePresistSub: Subscription;
  uiServiceLogoutSub: Subscription;
  authServiceSub: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private uiService: UIComponentsService
  ) {}

  ngOnInit(): void {
    this.uiServicePresistSub = this.uiService.userInfoPresist.subscribe(
      (presistUserInfoCard) => (this.userInfoCard = presistUserInfoCard)
    );

    this.uiService.userLogout.subscribe((userLogout) => {
      if (userLogout) {
        this.userDisplayName = '';
      }
    });

    this.authServiceSub = this.authService.user.subscribe((user) => {
      this.userDisplayName = user.displayName;
      this.userID = user.uid;
      this.photoURL = user.photoURL;
    });
    this.userCardOpacity = '1';
  }

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }

  navigateToSignup() {
    this.router.navigate(['/auth/signup']);
  }

  navigateToProfile() {
    this.router.navigate(['profile', this.userID]);
  }

  navigateToBlogs() {
    this.router.navigate(['/blogs']);
  }

  ngOnDestroy(): void {
    this.authServiceSub.unsubscribe();
    this.uiServicePresistSub.unsubscribe();
    this.uiServiceLogoutSub.unsubscribe();
  }
}
