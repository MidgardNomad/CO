import { Component } from '@angular/core';
import { CoursesService, Course } from 'DAL';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent {
  constructor(private coursesService: CoursesService) {}
  courseDB: Course[];
  // serv = inject(UsersService);

  ngOnInit() {
    this.coursesService.getAllCourses().subscribe((data) => {
      this.courseDB = data;
      console.log(this.courseDB);
      // this.dataSource = new MatTableDataSource(users);
    });
  }
}
