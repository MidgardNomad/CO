import { Component, OnInit } from '@angular/core';
import { Course, CoursesService } from 'DAL';

@Component({
  selector: 'app-career-details-dialog',
  templateUrl: './career-details-dialog.component.html',
  styleUrls: ['./career-details-dialog.component.scss']
})

export class CareerDetailsDialogComponent implements OnInit {
  courses: Course[];

  constructor(private coursesService: CoursesService) { }

//   getData() {
//     this.coursesService.getAllCourses().subscribe(courses => {
//       this.courses = courses;
//     })
//   }

//   getAllCareerCourses(careerID: string) {
//     return this.coursesService.getCoursesByID(courseID).subscribe(courses => {
//       this.courses = courses;
//     })
// }

  ngOnInit(): void {
    this.coursesService.getAllCourses().subscribe(courses => {
      this.courses = courses;
    })
  }
}
