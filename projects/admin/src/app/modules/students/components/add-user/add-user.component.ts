import { MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Component } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      displayName: ['', Validators.required],

      isVerified: this.fb.group({
        isVerTrue: [, [Validators.required]],
        isVerFals: [, [Validators.required]],
      }),
      isPro: this.fb.group({
        isProTrue: [, [Validators.required]],
        isProFals: [, [Validators.required]],
      }),
      isActive: this.fb.group({
        isActTrue: [, [Validators.required]],
        isActFals: [, [Validators.required]],
      }),
      linkedIn: ['', Validators.required],
      github: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
