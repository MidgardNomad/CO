import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course, User } from 'DAL';

import { loadingAnimation } from 'projects/portal/src/app/shared/functions/loadingAnimation';

@Component({
  selector: 'app-user-courses',
  templateUrl: './user-courses.component.html',
  styleUrls: ['./user-courses.component.scss'],
})
export class UserCoursesComponent implements OnInit {
  courses: Course[];
  @Input() userDoc: User;
  @ViewChild('container') container: ElementRef;
  @ViewChild('loadingSpinner') loadingSpinner: ElementRef;
  loadingAnimation = loadingAnimation();
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.courses = this.route.snapshot.data['courses'];
  }

  enrollingUser(event) {
    if (event) {
      this.loadingAnimation('block', 0.8, this.loadingSpinner, this.container);
    } else {
      this.loadingAnimation('none', 1, this.loadingSpinner, this.container);
    }
  }
}
