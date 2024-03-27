import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  working = false;
  complete = false;
  strongPassword = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  signupForm = new FormGroup(
    {
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
    return this.signupForm.controls;
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

  onGoBackToLogin() {
    this.router.navigate(['../login'], { relativeTo: this.route });
  }
  onSubmit() {
    this.router.navigate(['../..'], { relativeTo: this.route });
  }
}
