import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewCareerComponent } from 'projects/admin/src/app/modal/add-new-career/add-new-career.component';

@Component({
  selector: 'app-career-details',
  templateUrl: './career-details.component.html',
  styleUrls: ['./career-details.component.scss']
})

export class CareerDetailsComponent {
  panelOpenState = false;
  animal: string;
  name: string;

  constructor(public dialog: MatDialog) {}

/////////////////////////////////// Dailog ////////////////////////////////////////////

openDialog(): void {
  const dialogRef = this.dialog.open(AddNewCareerComponent, {
    data: {name: this.name, animal: this.animal},
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.animal = result;
  });
}
}