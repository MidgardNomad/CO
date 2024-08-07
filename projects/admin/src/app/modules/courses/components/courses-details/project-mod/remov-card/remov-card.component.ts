import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectModComponent } from '../project-mod.component';

@Component({
  selector: 'app-remov-card',
  templateUrl: './remov-card.component.html',
  styleUrls: ['./remov-card.component.scss'],
})
export class RemovCardComponent {
  constructor(
    private dialogRef: MatDialogRef<RemovCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
