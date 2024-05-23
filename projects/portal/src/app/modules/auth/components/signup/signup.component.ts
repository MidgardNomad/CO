import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'DAL';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  somethingWentWrong: boolean;
  errMessage: string;
  isLoading = false;
  signUpSub = new Subscription();
  constructor(private authService: AuthService) {
    this.somethingWentWrong = false;
  }

  ngOnInit(): void {}

  onSignUp(userCradentials: NgForm) {
    this.isLoading = true;
    const { userEmail, userPassword, userFirstName, userLastName } =
      userCradentials.value;
    this.signUpSub = this.authService
      .signUp(userEmail, userPassword, userFirstName, userLastName)
      .subscribe({
        next: (_) => {
          this.isLoading = false;
        },
        error: (err) => {
          this.somethingWentWrong = true;
          this.errMessage = err.message;
          this.isLoading = false;
        },
      });
  }
  ngOnDestroy(): void {
    this.signUpSub.unsubscribe();
  }
}
