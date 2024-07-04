import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course, UsersService } from 'DAL';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-courses',
  templateUrl: './user-courses.component.html',
  styleUrls: ['./user-courses.component.scss'],
})
export class UserCoursesComponent implements OnInit {
  userCourses: Observable<Course[]>;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('uid') !== null) {
      this.userCourses = this.usersService.getUserCourses(
        this.route.snapshot.paramMap.get('uid')
      );
    }
  }

  navigateToLearn(course: Course) {
    this.router.navigate(['/learn/course', course.id]);
  }

  navigateToCourses() {
    this.router.navigate(['/courses']);
  }
}
