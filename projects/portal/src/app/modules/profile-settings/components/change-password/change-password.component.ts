import {
  Component,
  ElementRef,
  OnInit,
  Renderer2 as Renderer,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from 'DAL';
import { MatSnackBar } from '@angular/material/snack-bar';
import { showSnackbar } from 'projects/portal/src/app/shared/functions/showsnackbar';
import { errorHandler } from 'projects/portal/src/app/shared/functions/errorHandler';
import { loadingAnimation } from 'projects/portal/src/app/shared/functions/loadingAnimation';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  strongPassword = false;
  @ViewChild('failedPWAlert') failedAlert: ElementRef;
  @ViewChild('successfulPWAlert') successAlert: ElementRef;
  @ViewChild('resetPWForm') resetPWForm: ElementRef;
  @ViewChild('loadingSpinner') loadingSpinner: ElementRef;
  showSnackBar = showSnackbar();
  loadingAnimation = loadingAnimation();
  constructor(
    private authService: AuthService,
    private renderer: Renderer,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  changePasswordForm = new FormGroup(
    {
      currentPassword: new FormControl(null, [
        Validators.minLength(8),
        Validators.required,
      ]),
      newPassword: new FormControl(null, [
        Validators.minLength(8),
        Validators.required,
      ]),
      newPasswordConfirm: new FormControl(null, [
        Validators.minLength(8),
        Validators.required,
      ]),
    },
    { validators: this.matchPassword }
  );

  get f() {
    return this.changePasswordForm.controls;
  }

  private matchPassword(controls: AbstractControl) {
    return controls.get('newPassword')?.value ===
      controls.get('newPasswordConfirm')?.value
      ? null
      : { mismatch: true };
  }

  onPasswordStrengthChanged(event: boolean) {
    this.strongPassword = event;
  }

  async onSubmit() {
    this.loadingAnimation('block', 0.8, this.loadingSpinner, this.resetPWForm);
    const { currentPassword, newPassword } = this.changePasswordForm.value;
    try {
      await this.authService.reauthenticate(currentPassword);
      await this.authService.changePassword(newPassword);
      this.showSnackBar('Password Changed Successfuly', 'success-snackbar');
      this.loadingAnimation('none', 1, this.loadingSpinner, this.resetPWForm);
    } catch (error) {
      this.loadingAnimation('none', 1, this.loadingSpinner, this.resetPWForm);
      this.showSnackBar(errorHandler(error), 'fail-snackbar');
      console.log(error.code);
    }
  }
}
