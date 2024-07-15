import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  Renderer2 as Renderer,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'DAL';
import { errorHandler } from '../../../../shared/functions/errorHandler';
import { loadingAnimation } from '../../../../shared/functions/loadingAnimation';
import { UIComponentsService } from 'projects/portal/src/app/services/ui-components.service';
import { MatDialog } from '@angular/material/dialog';
import { VerifyEmailDialogComponent } from './verify-email-dialog/verify-email-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('form') form: ElementRef;
  @ViewChild('loadingSpinner') loadingSpinner: ElementRef;
  @ViewChild('alert') alert: ElementRef;
  errMessage: string;
  isLoading = false;
  loadingAnimation = loadingAnimation();
  //Subs
  matDialogSub: Subscription;
  constructor(
    private authService: AuthService,
    private router: Router,
    private renderer: Renderer,
    private uiService: UIComponentsService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {}

  async onLogin(userCradentials: NgForm) {
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
    this.loadingAnimation('block', 0.8, this.loadingSpinner, this.form);
    try {
      let user = await this.authService.signIn(
        userEmail,
        userPassword,
        rememberUser
      );
      if (user.user.emailVerified) {
        this.router.navigate(['profile', user.user.uid]);
        this.loadingAnimation('none', 1, this.loadingSpinner, this.form);
        this.uiService.userLoginAction.next(true);
      } else {
        await this.authService.logout();
        this.isLoading = false;
        this.loadingAnimation('none', 1, this.loadingSpinner, this.form);
        this.matDialogSub = this.matDialog
          .open(VerifyEmailDialogComponent)
          .afterClosed()
          .subscribe((userResponse) => {
            if (userResponse) {
              this.authService.verifyEmail(user.user);
              this.router.navigate(['auth/email-verification'], {
                state: { userEmail },
              });
            }
          });
      }
    } catch (error) {
      this.isLoading = false;
      this.loadingAnimation('none', 1, this.loadingSpinner, this.form);
      this.errMessage = errorHandler(error);
      this.renderer.setStyle(this.alert.nativeElement, 'display', 'block');
    }
  }

  ngOnDestroy(): void {
    if (this.matDialogSub) this.matDialogSub.unsubscribe();
  }
}
