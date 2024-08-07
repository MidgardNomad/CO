import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, Course, CoursesService, UsersService, User } from 'DAL';

import { UIComponentsService } from '../../services/ui-components.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userDisplayName: string;
  userPhotoURL: string;
  userID: string;
  coursesList: Course[] = [];
  userCardOpacity = '0';
  userInfoCard: boolean;
  displayAuthActions = false;
  displayProfileCard = false;

  //=====Service Subscriptions======
  uiServicePresistSub: Subscription;
  uiServiceLogoutSub: Subscription;
  authServiceSub: Subscription;
  userServiceSub: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private usersService: UsersService,
    private uiService: UIComponentsService
  ) {}

  private getUserInfo() {}

  ngOnInit(): void {
    this.authService.user.subscribe((userAuthObj) => {
      if (userAuthObj !== null) {
        this.userDisplayName = userAuthObj.displayName;
        this.userID = userAuthObj.uid;
        this.userPhotoURL = userAuthObj.photoURL;
        this.displayProfileCard = true;
      } else {
        this.displayAuthActions = true;
      }
    });
    this.uiService.userLoginAction.subscribe((login) => {
      if (login) {
        window.location.reload();
      }
    });

    this.uiService.userSignupAction.subscribe((signup) => {
      if (signup) {
        window.location.reload();
      }
    });
    this.uiService.userLogoutAction.subscribe((logout) => {
      if (logout) {
        window.location.reload();
      }
    });
  }

  //Navigation
  //===============================
  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }

  navigateToSignup() {
    this.router.navigate(['/auth/signup']);
  }

  //========================================

  async onLogout() {
    try {
      await this.authService.logout();
      console.log('nav to auth');
      this.router.navigate(['/auth']);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy(): void {
    // this.authServiceSub.unsubscribe();
    // this.uiServicePresistSub.unsubscribe();
    // this.uiServiceLogoutSub.unsubscribe();
  }
}
