import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

export interface Data {
  title: string;
  disc: string;
}

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss'],
})
export class StudentDetailsComponent {
  email = 'osama@gmail.com';
  // Function Delete 1 //

  // show1: boolean = true;
  // show2: boolean = true;
  // show3: boolean = true;

  // delet() {
  //   this.show1 = false;
  // }
  // delet2() {
  //   this.show2 = false;
  // }
  // delet3() {
  //   this.show3 = false;
  // }

  // Function Delete 2 //
  coursesList1 = [{ title1: 'Web Development', disc: 'In Progress' }];
  coursesList2 = [{ title2: 'Introduction to CSS', disc: 'In Progress' }];
  coursesList3 = [{ title3: 'Frond-end for', disc3: 'In Progress' }];

  delete1(index: number) {
    this.coursesList1.splice(index, 1);
  }
  delete2(index: number) {
    this.coursesList2.splice(index, 1);
  }
  delete3(index: number) {
    this.coursesList3.splice(index, 1);
  }

  // ------------------------------------------------------------------------------------------------------------//
  // Routing For Button Student Details //
  private routin = inject(Router);
  getComm() {
    this.routin.navigate(['students/list']);
  }
  getCourses() {
    this.routin.navigate(['courses/list']);
  }
}
