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
  user: User;
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
    private uiService: UIComponentsService,
    private coursesService: CoursesService
  ) {}

  private getUserInfo() {
    if (this.usersService.userDoc === null) {
      this.displayAuthActions = true;
    } else {
      this.userServiceSub = this.usersService.userDoc?.subscribe((userDoc) => {
        this.user = userDoc;
        this.displayProfileCard = true;
      });
    }
  }

  ngOnInit(): void {
    this.getUserInfo();
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
