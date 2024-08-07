import { Data } from '@angular/router';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss'],
})
export class EditCardComponent {
  form: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<EditCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      title: [data.title, Validators.required],
    });
  }
  editCard() {
    this.dialogRef.close({
      id: this.data.id,
      title: this.form.value.title,
    });
  }
}
