import {
  Component,
  OnDestroy,
  OnInit,
  AfterViewInit,
  AfterContentInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, Course, CoursesService } from 'DAL';

import { UIComponentsService } from '../../services/ui-components.service';
import { Subscription } from 'rxjs';

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
  displayProfileCard = false;

  //=====Service Subscriptions======
  uiServicePresistSub: Subscription;
  uiServiceLogoutSub: Subscription;
  authServiceSub: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private uiService: UIComponentsService,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    this.authServiceSub = this.authService.user.subscribe((user) => {
      if (user !== null) {
        this.userDisplayName = user.displayName;
        this.userID = user.uid;
        this.photoURL = user.photoURL;
        this.displayProfileCard = true;
      }
    });
    this.uiServicePresistSub = this.uiService.userInfoPresist.subscribe(
      (presistUserInfoCard) => {
        console.log(presistUserInfoCard);
        this.userInfoCard = presistUserInfoCard;
      }
    );

    this.uiServiceLogoutSub = this.uiService.userLogout.subscribe(
      (userLogout) => {
        if (userLogout) {
          this.displayProfileCard = false;
        }
      }
    );

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

  navigateToProfile() {
    this.router.navigate(['profile', this.userID]);
  }

  //========================================

  ngOnDestroy(): void {
    this.authServiceSub.unsubscribe();
    this.uiServicePresistSub.unsubscribe();
    this.uiServiceLogoutSub.unsubscribe();
  }

  navigateCourses(coursesID: string) {
    this.router.navigateByUrl(`/learn/course/${coursesID}`);
  }
}
