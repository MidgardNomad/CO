import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-course-dialog',
  templateUrl: './delete-course-dialog.component.html',
  styleUrls: ['./delete-course-dialog.component.scss'],
})
export class DeleteCourseDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { courseTitle: string }) {}
}
