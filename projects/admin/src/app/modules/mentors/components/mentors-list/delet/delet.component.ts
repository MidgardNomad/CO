import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delet',
  templateUrl: './delet.component.html',
  styleUrls: ['./delet.component.scss'],
})
export class DeletComponent {
  constructor(public dialogRef: MatDialogRef<DeletComponent>) {}
}
