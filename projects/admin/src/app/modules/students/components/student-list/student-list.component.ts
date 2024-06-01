import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent {
  // hide = true;
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

  // Handel Input (User Name / Email)
  // emails = new FormControl('', [Validators.required, Validators.email]);
  // getErrorMessage() {
  //   return this.emails.hasError('email') ? 'Not a valid email' : '';
  // }

  // inter face     <===/* Note */
  Email = 'Mark@gmail.com';
  Password = 12345;
  Mobile = 1012345678;
  Contry = 'Egypt';

  //delet        <=====================

  // delet(index) {
  //   this.users.splice(index, 1);
  //   this.dele.push(index);
  //   console.log(this.dele);

  //Student Details
  private routin = inject(Router);
  getComm() {
    this.routin.navigate(['students/details']);
  }

  // -------------------------------------Form--------------------------------------------------
  dele = true;

  deleted() {
    this.dele = false;
  }

  // -------------------------------------------------------------------------------------
  users = [];

  constructor(public dialog: MatDialog) {}

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
}

interface User {
  userName: string;
  email: string;
  password: number;
  mobile: number;
  country: string;
}
