import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EeditUserComponent } from '../../../../students/components/student-list/Edit-user/edit-user.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EeditUserComponent>,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      displayName: ['', Validators.required],

      isVerified: this.fb.group({
        isVerTrue: ['', [Validators.required]],
        isVerFals: ['', [Validators.required]],
      }),
      isPro: this.fb.group({
        isProTrue: ['', [Validators.required]],
        isProFals: ['', [Validators.required]],
      }),
      isActive: this.fb.group({
        isActTrue: ['', [Validators.required]],
        isActFals: ['', [Validators.required]],
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
