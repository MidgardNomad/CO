import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mentors-list',
  templateUrl: './mentors-list.component.html',
  styleUrls: ['./mentors-list.component.scss'],
})
export class MentorsListComponent {
  //Router Mentor Details
  private routin = inject(Router);
  getComm() {
    this.routin.navigate(['mentors/details']);
  }
}
