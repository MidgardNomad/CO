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
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onLogin(userCradentials: NgForm) {
    const { userEmail, userPassword, rememberUser } = userCradentials.value;
    if (rememberUser) {
      this.authService.setStayLoggedIn = rememberUser;
    }
    this.authService.login(userEmail, userPassword).subscribe({
      next: (_) => {
        this.authService.currentUser.subscribe((user) =>
          console.log(user?.uid)
        );
      },
      error: (_) => {
        this.somethingWentWrong = true;
      },
    });
  }
}
