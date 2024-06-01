import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Chapter } from 'DAL';

@Component({
  selector: 'app-delete-chapter-dialog',
  templateUrl: './delete-chapter-dialog.component.html',
  styleUrls: ['./delete-chapter-dialog.component.scss'],
})
export class DeleteChapterDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string }) {}
}
