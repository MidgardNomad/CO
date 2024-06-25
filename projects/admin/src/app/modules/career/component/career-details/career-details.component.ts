import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Course, CoursesService } from 'DAL';
import { CareerDetailsDialogComponent } from 'projects/admin/src/app/modal/career-details-dialog/career-details-dialog.component';

///////////////////////////////// Interface of data //////////////////////////////////

// export interface CareerDetials {
//   NO: number;
//   id: string;
//   title: string;
//   description: string;
//   courseList: string[];
// }

//////////////////////////////////////////////////////////////////////////////////////

@Component({
  selector: 'app-career-details',
  templateUrl: './career-details.component.html',
  styleUrls: ['./career-details.component.scss'],
  
})

export class CareerDetailsComponent implements OnInit{

  courses: Course[];

  panelOpenState = false;

  constructor(private dialog: MatDialog, private coursesService: CoursesService) { }

  ngOnInit(): void {
    // this.coursesService.getAllCourses().subscribe(courses => {
    //   this.courses = courses;
    // })
  }

  addCourse() {
    this.dialog.open(CareerDetailsDialogComponent, {
      disableClose: true,
      width: '500px'
    })
  }

  ///////////////////////////////// Array of data ////////////////////////////////////

  // ELEMENT_DATA: CareerDetials[] = [
  //   { NO: 1, id: "", title: 'UI', description: "", courseList: [] },
  //   { NO: 2, id: "", title: 'UI/UX', description: "", courseList: [] },
  //   { NO: 3, id: "", title: 'Frontend', description: "", courseList: [] },
  //   { NO: 4, id: "", title: 'Backend', description: "", courseList: [] },
  //   { NO: 5, id: "", title: 'Fullstack', description: "", courseList: [] },
  // ];

}