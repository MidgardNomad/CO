import {
  Component,
  OnDestroy,
  OnInit,
  AfterViewInit,
  AfterContentInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, Course, CoursesService, UsersService } from 'DAL';

import { UIComponentsService } from '../../services/ui-components.service';
import { Subscription } from 'rxjs';
import { P } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterContentInit, OnDestroy {
  userDisplayName: string;
  userID: string;
  photoURL: string;
  coursesList: Course[] = [];
  userCardOpacity = '0';
  userInfoCard: boolean;
  displayAuthActions = false;
  displayProfileCard = false;

  //=====Service Subscriptions======
  uiServicePresistSub: Subscription;
  uiServiceLogoutSub: Subscription;
  authServiceSub: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private usersService: UsersService,
    private uiService: UIComponentsService,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    if (this.usersService.userDoc !== null) {
      this.usersService.userDoc.subscribe((userData) => {
        this.userDisplayName = userData.displayName;
        this.photoURL = userData.photoURL;
        this.userID = userData.id;
        this.displayProfileCard = true;
      });
    } else {
      this.displayAuthActions = true;
    }

    this.uiService.userLoginAction.subscribe((login) => {
      if (login) {
        this.usersService.getUser();
        this.displayAuthActions = false;
        this.displayProfileCard = true;
      }
    });

    this.uiService.userSignupAction.subscribe((signup) => {
      if (signup) {
        this.usersService.getUser();
        this.displayAuthActions = false;
        this.displayProfileCard = true;
      }
    });
    this.uiService.userLogoutAction.subscribe((logout) => {
      if (logout) {
        this.displayAuthActions = true;
        this.displayProfileCard = false;
      }
    });

    this.getAllCourses();
  }

  ngAfterContentInit(): void {
    this.userCardOpacity = '1';
  }

  getAllCourses() {
    this.coursesService.getAllCourses().subscribe((res) => {
      this.coursesList = res;
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
      this.displayAuthActions = true;
      this.displayProfileCard = false;
      this.router.navigate(['/auth']);
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
