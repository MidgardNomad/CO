import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DeletComponent } from '../delet/delet.component';
import { EeditUserComponent } from '../Edit-user/edit-user.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { UsersService } from 'DAL';
import { Router } from '@angular/router';
import { User } from 'aws-sdk/clients/budgets';

@Component({
  selector: 'app-student-liber',
  templateUrl: './student-liber.component.html',
  styleUrls: ['./student-liber.component.scss'],
})
export class StudentLiberComponent {
  // ---------------------------------------button Student Details ------------------------------------------------------------

  //Router Student Details
  private routin = inject(Router);
  getComm() {
    this.routin.navigate(['students/details']);
  }

  // ------------------------------------ Logic bind Data then Form To Tabel-------------------------------------------------
  users = [];
  constructor(public dialog: MatDialog, private usersService: UsersService) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
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
  // ------------------------------------ Edit Data then Form To Tabel-------------------------------------------------
  EditDialog(): void {
    const dialogRefs = this.dialog.open(EeditUserComponent, {
      disableClose: true,
    });

    dialogRefs.afterClosed().subscribe((result) => {
      if (result) {
        this.users.push(result);
      }
    });
  }
  dataSource;

  // ------------------------------------  Get Service Data base From Fire base-------------------------------------------------
  // Get Service
  usersDB: any;
  // serv = inject(UsersService);

  ngOnInit() {
    this.usersService.getAllUsers().subscribe((users) => {
      this.usersDB = users;
      this.dataSource = new MatTableDataSource(users);
    });
  }

  // ---------------------------------------------------------------------------------------------------
  // -------------------------------------------------- Alert For Delete--------------------------------
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
}
