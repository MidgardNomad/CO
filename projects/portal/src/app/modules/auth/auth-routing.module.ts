import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { VerifyOtpComponent } from './components/verify-otp/verify-otp.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { EmailComponent } from './components/email/email.component';
import { EamilVerificationGuard } from '../../guards/email-verification.guard';
import { ResetPasswordEmailComponent } from './components/reset-password-email/reset-password-email.component';
import { Unused } from '../../guards/unused.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
        title: 'Login',
      },
      {
        path: 'signup',
        component: SignupComponent,
        title: 'Sign-up',
      },
      {
        path: 'email-verification',
        canActivate: [EamilVerificationGuard],
        component: EmailComponent,
        title: 'Email Verification',
      },
      {
        path: 'reset-password-email',
        canActivate: [EamilVerificationGuard],
        component: ResetPasswordEmailComponent,
        title: 'Reset Password',
      },
      {
        path: 'verify',
        component: VerifyOtpComponent,
        title: 'Verify Your Email',
        canActivate: [Unused],
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        title: 'Forgot Password',
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
        title: 'Reset Password',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
