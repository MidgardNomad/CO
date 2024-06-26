import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService, Course, UsersService } from 'DAL';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent {
  constructor(
    private coursesService: CoursesService,
    private usersService: UsersService,
    private router: Router
  ) {}
  courseDB: Course[];
  // serv = inject(UsersService);

  ngOnInit() {
    this.coursesService.getAllCourses().subscribe((data) => {
      this.courseDB = data;
    });
  }

  enroll(course: Course) {
    const userId = this.usersService.userID;
    this.usersService
      .enrollInCourse(userId, course.id, course)
      .then(() => {
        this.router.navigate(['/learn/course', course.id]);
      })
      .catch((err) => console.log(err));
  }
}
