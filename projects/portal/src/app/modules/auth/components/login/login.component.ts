import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'DAL';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  somethingWentWrong = false;
  errMessage: string;
  isLoading = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // this.authService.logout().subscribe();
  }

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

    this.authService.login(userEmail, userPassword, rememberUser).subscribe({
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
}
