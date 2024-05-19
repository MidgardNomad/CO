import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'DAL';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  somethingWentWrong: boolean;
  errMessage: string;
  constructor(private authService: AuthService) {
    this.somethingWentWrong = false;
  }

  ngOnInit(): void {
    // this.authService.logout().subscribe();
  }

  onSignUp(userCradentials: NgForm) {
    const { userEmail, userPassword, userFirstName, userLastName } =
      userCradentials.value;
    this.authService
      .signUp(userEmail, userPassword, userFirstName, userLastName)
      .subscribe({
        next: (_) => console.log('sign up success'),
        error: (err) => {
          this.somethingWentWrong = true;
          this.errMessage = err.message;
        },
      });
    // this.authService.currentUser.subscribe({
    //   next: (user) => console.log(user),
    // });
  }
}
