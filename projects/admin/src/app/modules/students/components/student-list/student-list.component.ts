import { UsersService } from './../../../../../../../dal/src/lib/services/users.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddUserComponent } from './add-user/add-user.component';
import { Observable } from 'rxjs';
import { User } from 'DAL';
import { MatTableDataSource } from '@angular/material/table';
import { DeletComponent } from './delet/delet.component';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent {
  // ---------------------------------------------------------------------------------------------------
  // Add && Delete (stady)
  // ---------------------------------------------------------------------------------------------------
  // dele = [];
  // userName: string = '';
  // email: string = '';
  // password: number;
  // mobile: number;
  // contry: string;
  // users: User[] = [];

  // myForm = new FormGroup({
  //   userName: new FormControl(''),
  //   email: new FormControl(''),
  //   password: new FormControl(),
  //   mobile: new FormControl(),
  //   contry: new FormControl(''),
  // });
  // addUser() {
  //   if (
  //     this.userName !== '' &&
  //     this.email !== '' &&
  //     this.password &&
  //     this.mobile &&
  //     this.contry !== ''
  //   ) {
  //     this.users.push({
  //       userName: this.userName,
  //       email: this.email,
  //       password: this.password,
  //       mobile: this.mobile,
  //       contry: this.contry,
  //     });

  //     this.userName = '';
  //     this.email = '';
  //     this.password = null;
  //     this.mobile = null;
  //     this.contry = '';
  //   }
  //   // console.log(this.users);
  // }

  //delet
  // delet(index) {
  //   this.users.splice(index, 1);
  //   this.dele.push(index);
  //   console.log(this.dele);
  // --------------------------------------------Filter-------------------------------------------------------
  displayedColumns: string[] = [
    'id',
    'DisplayName',
    'isVerified',
    'isPro',
    'Active',
    'URL',
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // ---------------------------------------------------------------------------------------------------
  // ---------------------------------------button Student Details ------------------------------------------------------------

  //Router Student Details
  private routin = inject(Router);
  getComm() {
    this.routin.navigate(['students/details']);
  }

  // ------------------------------------ Logic bind Data then Form To Tabel-------------------------------------------------
  users = [];
  constructor(public dialog: MatDialog, usersService: UsersService) {}

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

  // Get Service
  usersDB: Observable<User[]>;
  serv = inject(UsersService);

  ngOnInit() {
    this.usersDB = this.serv.getAllUsers();
  }

  // ---------------------------------------------------------------------------------------------------
  // -------------------------------------------------- Alert For Delete--------------------------------
  public dialogs = inject(MatDialog);

  openDialogs(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialogs.open(DeletComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
    });
  }
}

// interface For Filter
export interface UserData {
  id: number;
  DisplayName: string;
  isVerified: boolean;
  isPro: boolean;
  Active: boolean;
  URL: string;
}

const ELEMENT_DATA: UserData[] = [
  {
    id: 1,
    DisplayName: 'osama',
    isVerified: true,
    isPro: true,
    Active: true,
    URL: 'http://localhost:4200/students/list',
  },
  {
    id: 2,
    DisplayName: 'omar',
    isVerified: false,
    isPro: false,
    Active: true,
    URL: 'http://localhost:4200/students/list',
  },
];
