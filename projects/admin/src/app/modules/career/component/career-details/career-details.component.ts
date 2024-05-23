import { DeleteCareerComponent } from 'projects/admin/src/app/modal/delete-career/delete-career.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditCareerComponent } from 'projects/admin/src/app/modal/edit-career/edit-career.component';

///////////////////////////////// Interface of data ///////////////////////////////////

export interface CareerDetials {
  position: number;
  CareerName: string;
  Hours: number;
  Lessons: number;
  Details: any;
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

  ///////////////////////////////// Array of data ////////////////////////////////////

  ELEMENT_DATA: CareerDetials[] = [
    { position: 1, CareerName: 'UI', Hours: 20, Lessons: 30, Details: "" },
    { position: 2, CareerName: 'UI/UX', Hours: 30, Lessons: 40, Details: "" },
    { position: 3, CareerName: 'Frontend', Hours: 40, Lessons: 50, Details: "" },
    { position: 4, CareerName: 'Backend', Hours: 50, Lessons: 60, Details: "" },
    { position: 5, CareerName: 'Fullstack', Hours: 100, Lessons: 100, Details: "" },
  ];

  ////////////////////////////////// Edit dailog ////////////////////////////////////

  openDialogEdit(): void {
    let dialogRef = this.dialog.open(EditCareerComponent, {
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  ///////////////////////////////// Delete dailog ///////////////////////////////////

  openDialogDelete(): void {
    let dialogRefDelete = this.dialog.open(DeleteCareerComponent, {
      data: { name: this.name, animal: this.animal },
    });

    dialogRefDelete.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}