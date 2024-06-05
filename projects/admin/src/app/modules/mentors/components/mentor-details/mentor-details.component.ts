import { Component, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mentor-details',
  templateUrl: './mentor-details.component.html',
  styleUrls: ['./mentor-details.component.scss'],
})
export class MentorDetailsComponent {
  email = 'Omar@gmail.com';

  //Router Mentor Details
  private routin = inject(Router);
  getList() {
    this.routin.navigate(['mentors/list']);
  }

  // ///////////////////////////////////////////////Filter//////////////////////////////
}
