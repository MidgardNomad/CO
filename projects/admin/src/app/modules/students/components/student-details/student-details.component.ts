import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss'],
})
export class StudentDetailsComponent {
  //Student Details
  private routin = inject(Router);
  getComm() {
    this.routin.navigate(['students/list']);
  }
}
