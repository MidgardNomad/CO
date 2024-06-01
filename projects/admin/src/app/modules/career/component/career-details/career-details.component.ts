import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

///////////////////////////////// Interface of data //////////////////////////////////

export interface CareerDetials {
  NO: number;
  id: string;
  title: string;
  description: string;
  courseList: string[];
}

//////////////////////////////////////////////////////////////////////////////////////

@Component({
  selector: 'app-career-details',
  templateUrl: './career-details.component.html',
  styleUrls: ['./career-details.component.scss']
})

export class CareerDetailsComponent {

  panelOpenState = false;
  animal: string;
  name: string;

  constructor(public dialog: MatDialog) { }

///////////////////////////////// Array of data //////////////////////////////////////

  ELEMENT_DATA: CareerDetials[] = [
    { NO: 1, id: "", title: 'UI', description: "", courseList: [] },
    { NO: 2, id: "", title: 'UI/UX', description: "", courseList: [] },
    { NO: 3, id: "", title: 'Frontend', description: "", courseList: [] },
    { NO: 4, id: "", title: 'Backend', description: "", courseList: [] },
    { NO: 5, id: "", title: 'Fullstack', description: "", courseList: [] },
  ];

}