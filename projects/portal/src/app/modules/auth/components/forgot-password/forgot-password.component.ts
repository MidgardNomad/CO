import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Renderer2 as Renderer,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'DAL';
import { errorHandler } from 'projects/portal/src/app/shared/functions/errorHandler';
import { loadingAnimation } from 'projects/portal/src/app/shared/functions/loadingAnimation';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  //View
  //============
  @ViewChild('form') form: ElementRef;
  @ViewChild('loadingSpinner') loadingSpinner: ElementRef;
  @ViewChild('alert') alert: ElementRef;
  //============
  isLoading = false;
  errMessage: string;
  loadingAnimation = loadingAnimation();
  constructor(
    private router: Router,
    private authService: AuthService,
    private renderer: Renderer
  ) {}

  ngOnInit(): void {}

  onGoBackToLogin() {
    this.router.navigate(['auth']);
  }

  async onSendCode(form: NgForm) {
    this.loadingAnimation('block', 0.8, this.loadingSpinner, this.form);
    try {
      console.log('send');
      const userEmail: string = form.value['userEmail'];
      await this.authService.resetPasswordEmail(userEmail);
      this.loadingAnimation('none', 1, this.loadingSpinner, this.form);
      this.router.navigate(['auth/reset-password-email'], {
        state: { userEmail },
      });
    } catch (error) {
      console.log(error);
      this.errMessage = errorHandler(error);
      this.renderer.setStyle(this.alert.nativeElement, 'display', 'block');
      this.loadingAnimation('none', 1, this.loadingSpinner, this.form);
    }
  }
}
