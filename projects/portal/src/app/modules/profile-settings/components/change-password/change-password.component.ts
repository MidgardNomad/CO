import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  strongPassword = false;
  constructor(private route: ActivatedRoute, private router: Router) {}

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

  onSubmit() {
    this.router.navigate(['../..'], { relativeTo: this.route });
  }
}
