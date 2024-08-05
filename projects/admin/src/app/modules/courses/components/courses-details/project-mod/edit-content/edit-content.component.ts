import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-content',
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.scss'],
})
export class EditContentComponent {
  form: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<EditContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { content: any; dataID: string },
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      content: [data.content],
    });
  }
  editContent() {
    this.dialogRef.close({
      id: this.data.dataID,
      content: this.form.value.content,
    });
  }
}
