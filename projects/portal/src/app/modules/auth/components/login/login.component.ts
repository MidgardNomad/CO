import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'DAL';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  somethingWentWrong = false;
  errMessage: string;
  isLoading = false;
  loginSub = new Subscription();
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onLogin(userCradentials: NgForm) {
    const {
      userEmail,
      userPassword,
      rememberUser,
    }: {
      userEmail: string;
      userPassword: string;
      rememberUser: boolean | '';
    } = userCradentials.value;
    this.isLoading = true;

    this.loginSub = this.authService
      .login(userEmail, userPassword, rememberUser)
      .subscribe({
        next: (_) => {
          this.isLoading = false;
        },
        error: (err) => {
          this.somethingWentWrong = true;
          this.isLoading = false;
          this.errMessage = err.message;
        },
      });
  }
  ngOnDestroy(): void {
    this.loginSub.unsubscribe();
  }
}
