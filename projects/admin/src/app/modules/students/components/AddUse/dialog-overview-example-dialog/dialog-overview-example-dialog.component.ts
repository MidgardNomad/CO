import { Component, Inject, Input, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

interface User {
  userName: string;
  email: string;
  password: number;
  mobile: number;
  contry: string;
}

@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.component.html',
  styleUrls: ['./dialog-overview-example-dialog.component.scss'],
})
export class DialogOverviewExampleDialogComponent {
  // hide = true;
  // dele = [];
  // userName: string = '';
  // email: string = '';
  // password: number;
  // mobile: number;
  // contry: string;
  // users: User[] = [];

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
  //   console.log(this.users);
  // }

  // emails = new FormControl('', [Validators.required, Validators.email]);
  // getErrorMessage() {
  //   return this.emails.hasError('email') ? 'Not a valid email' : '';
  // }
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      mobile: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
