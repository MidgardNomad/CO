import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'DAL';
import { CoursesService } from 'DAL';
import { Course } from 'projects/dal/src/public-api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userDisplayName: string;
  userID: string;
  photoURL: string;
  coursesList: Course[] = [];

  constructor(private router: Router, private authService: AuthService, private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.userDisplayName = user.displayName;
      this.userID = user.uid;
      this.photoURL = user.photoURL;
    });
    this.getAllCourses();
  }

  getAllCourses() {
    this.coursesService.getAllCourses().subscribe(res => {
      console.log(res)
      this.coursesList = res
    }
    )
  }

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }

  navigateToSignup() {
    this.router.navigate(['/auth/signup']);
  }

  navigateToProfile() {
    this.router.navigate(['profile', this.userID])
  }

  navigateToBlogs() {
    this.router.navigate(['/blogs'])
  }

  navigateCourses(coursesID: string) {
    this.router.navigateByUrl(`/learn/course/${coursesID}`)
  }
}
