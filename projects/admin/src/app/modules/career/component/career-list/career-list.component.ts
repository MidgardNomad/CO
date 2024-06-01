import { ImageConfig } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { AddNewCareerComponent } from 'projects/admin/src/app/modal/add-new-career/add-new-career.component';
import { EditCareerComponent } from 'projects/admin/src/app/modal/edit-career/edit-career.component';
import { DeleteCareerComponent } from 'projects/admin/src/app/modal/delete-career/delete-career.component';

///////////////////////////////// Interface of data //////////////////////////////////

export interface CareerList {
  NO: number;
  id: string;
  title: string;
  description: string;
  courseList: string[];
}

//////////////////////////////////////////////////////////////////////////////////////

@Component({
  selector: 'app-career-list',
  templateUrl: './career-list.component.html',
  styleUrls: ['./career-list.component.scss']
})

export class CareerListComponent {

  animal: string;
  name: string;

  constructor(public dialog: MatDialog) { }

  ////////////////////////////////// Array of data ///////////////////////////////////

  ELEMENT_DATA: CareerList[] = [
    { NO: 1, id: "", title: 'UI', description: "", courseList: [] },
    { NO: 2, id: "", title: 'UI/UX', description: "", courseList: [] },
    { NO: 3, id: "", title: 'Frontend', description: "", courseList: [] },
    { NO: 4, id: "", title: 'Backend', description: "", courseList: [] },
    { NO: 5, id: "", title: 'Fullstack', description: "", courseList: [] },
  ];

  displayedColumns: string[] = ['NO', 'id', 'title', 'description', 'courseList', 'Details', 'Update', 'Delete'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  ///////////////////////////////////// Search ///////////////////////////////////////

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /////////////////////////////////// Add dailog /////////////////////////////////////

  openDialog(): void {
    const dialogRef = this.dialog.open(AddNewCareerComponent, {
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

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
