import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DeletComponent } from './delet/delet.component';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';
import { MatTableDataSource } from '@angular/material/table';
import { UserData } from '../../../students/components/student-list/student-list.component';

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
  // -------------------------------------------------- Alert For Delete-----------------------------
  public dialogs = inject(MatDialog);

  DeletDialogs(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialogs.open(DeletComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
    });
  }

  // -------------------------------------------------- Add Form-----------------------------
  constructor(public dialog: MatDialog) {}
  user = [];

  openDialog(): void {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '550px',
      height: '580px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.users.push(result);
      }
    });
  }
  // -------------------------------------------------- Edit Form-----------------------------
  users = [];
  EditDialog(): void {
    const dialogRefs = this.dialog.open(EditComponent, {
      disableClose: true,
      width: '400px',
    });

    dialogRefs.afterClosed().subscribe((result) => {
      if (result) {
        this.users.push(result);
      }
    });
  }
}
