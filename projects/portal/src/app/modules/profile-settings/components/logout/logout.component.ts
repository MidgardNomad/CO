import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'DAL';
import { errorHandler } from 'projects/portal/src/app/shared/functions/errorHandler';
import { showSnackbar } from 'projects/portal/src/app/shared/functions/showsnackbar';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent {
  private showSnackBar = showSnackbar();
  constructor(private router: Router, private authService: AuthService) {}
  onNavigateHome() {
    this.router.navigate(['/']);
  }

  async onLogout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/']);
    } catch (error) {
      this.showSnackBar(errorHandler(error), 'fail-snackbar');
    }
  }
}
