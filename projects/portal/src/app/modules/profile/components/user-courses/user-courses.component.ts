import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-courses',
  templateUrl: './user-courses.component.html',
  styleUrls: ['./user-courses.component.scss'],
})
export class UserCoursesComponent {
  constructor(private router: Router) {}

  navigateToCourses() {
    this.router.navigate(['/courses/courses-list']);
  }
}
