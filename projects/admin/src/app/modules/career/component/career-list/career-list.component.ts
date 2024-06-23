import { ImageConfig } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { AddNewCareerComponent } from 'projects/admin/src/app/modal/add-new-career/add-new-career.component';
import { EditCareerComponent } from 'projects/admin/src/app/modal/edit-career/edit-career.component';
import { DeleteCareerComponent } from 'projects/admin/src/app/modal/delete-career/delete-career.component';
import { Observable, Subscription } from 'rxjs';
import { CareerPathService, Cp } from 'DAL';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-career-list',
  templateUrl: './career-list.component.html',
  styleUrls: ['./career-list.component.scss']
})

export class CareerListComponent implements OnInit, OnDestroy {

  dataSource;
  cpSub: Subscription;

  constructor(public dialog: MatDialog, private cpService: CareerPathService) {
  }

  ngOnInit(): void {
    this.cpSub = this.cpService.getAllCareerPaths().subscribe(cpList => {
    this.dataSource = new MatTableDataSource(cpList);
    });
  }

  displayedColumns: string[] = ['title', 'description', 'Details', 'Update', 'Delete'];

  ///////////////////////////////////// Search ///////////////////////////////////////

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /////////////////////////////////// Add dailog /////////////////////////////////////

  openDialog(): void {
    const dialogRef = this.dialog.open(AddNewCareerComponent);
  }

  ////////////////////////////////// Edit dailog ////////////////////////////////////

  openDialogEdit(cpID: string, cpTitle: string, cpDescription: string): void {
    let dialogRef = this.dialog.open(EditCareerComponent, {
      data: { cpID, cpTitle, cpDescription },
    });
  }

  ///////////////////////////////// Delete dailog ///////////////////////////////////

  openDialogDelete(cpID: string): void {
    let dialogRefDelete = this.dialog.open(DeleteCareerComponent);

    dialogRefDelete.afterClosed().subscribe(result => {
      if (result) {
        this.cpService.deleteCareerPath(cpID);
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////

  ngOnDestroy(): void {
    this.cpSub.unsubscribe()
  }

}
