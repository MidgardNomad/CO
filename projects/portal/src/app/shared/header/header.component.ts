import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'DAL';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userDisplayName: string;
  userID: string;
  photoURL: string;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.userDisplayName = user.displayName;
      this.userID = user.uid;
      this.photoURL = user.photoURL;
    });
  }

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }

  navigateToSignup() {
    this.router.navigate(['/auth/signup']);
  }

  navigateToProfile() {
    this.router.navigate(['profile', this.userID])
  }

  navigateToBlogs() {
    this.router.navigate(['/blogs'])
  }
}
