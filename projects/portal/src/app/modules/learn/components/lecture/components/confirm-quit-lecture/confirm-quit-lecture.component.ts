import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-quit-lecture',
  templateUrl: './confirm-quit-lecture.component.html',
  styleUrls: ['./confirm-quit-lecture.component.scss'],
})
export class ConfirmQuitLectureComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { courseID: string },
    private matDialogRef: MatDialogRef<ConfirmQuitLectureComponent>,
    private router: Router
  ) {}

  onQuit() {
    this.router.navigate(['/learn/course', this.data.courseID]);
    this.matDialogRef.close();
  }
}
