import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password-email',
  templateUrl: './reset-password-email.component.html',
  styleUrls: ['./reset-password-email.component.scss'],
})
export class ResetPasswordEmailComponent {
  userEmail = '';
  constructor(private router: Router) {
    this.userEmail =
      this.router.getCurrentNavigation().extras?.state['userEmail'];
  }
}
