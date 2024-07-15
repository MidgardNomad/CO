import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { VerifyOtpComponent } from './components/verify-otp/verify-otp.component';
import { SharedModule } from '../../shared/shared.module';
import { NgOtpInputModule } from 'ng-otp-input';
import { EmailComponent } from './components/email/email.component';
import { VerifyEmailDialogComponent } from './components/login/verify-email-dialog/verify-email-dialog.component';

@NgModule({
  declarations: [
    AuthComponent,
    SignupComponent,
    ForgotPasswordComponent,
    LoginComponent,
    ResetPasswordComponent,
    VerifyOtpComponent,
    EmailComponent,
    VerifyEmailDialogComponent,
  ],
  imports: [CommonModule, SharedModule, AuthRoutingModule, NgOtpInputModule],
})
export class AuthModule {}
