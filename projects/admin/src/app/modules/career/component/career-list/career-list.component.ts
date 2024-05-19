import { ImageConfig } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import {MatTableDataSource} from '@angular/material/table';
import { AddNewCareerComponent } from 'projects/admin/src/app/modal/add-new-career/add-new-career.component';

///////////////////////////////// Interface of data ///////////////////////////////////

export interface CareerList {
  position: number;
  CareerName: string;
  Hours: number;
  Lessons: number;
  Details:any;
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

  constructor(public dialog: MatDialog) {}

/////////////////////////////////// Array of data //////////////////////////////////////

  ELEMENT_DATA: CareerList[] = [
    {position: 1, CareerName: 'UI', Hours: 20, Lessons: 30, Details: ""},
    {position: 2, CareerName: 'UI/UX', Hours: 30, Lessons: 40, Details:""},
    {position: 3, CareerName: 'Frontend', Hours: 40, Lessons: 50, Details:""},
    {position: 4, CareerName: 'Backend', Hours: 50, Lessons: 60, Details:""},
    {position: 5, CareerName: 'Fullstack', Hours: 100, Lessons: 100, Details:""},
  
  ];
  displayedColumns: string[] = ['position', 'CareerName', 'Hours', 'Lessons', 'Details'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

/////////////////////////////////////// Search /////////////////////////////////////////

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

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
