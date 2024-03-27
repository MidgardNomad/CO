import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { TranslateModule } from '@ngx-translate/core';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { VerifyOtpComponent } from './components/verify-otp/verify-otp.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { SharedModule } from '../../shared/shared/shared.module';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    SignupComponent,
    ForgetPasswordComponent,
    VerifyOtpComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    TranslateModule,
    FormsModule,
    SharedModule,
    NgOtpInputModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
