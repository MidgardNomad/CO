import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Chapter, Course, CoursesService } from 'DAL';
import { CreateNewChapterDialogComponent } from './create-new-chapter-dialog/create-new-chapter-dialog.component';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-courses-details',
  templateUrl: './courses-details.component.html',
  styleUrls: ['./courses-details.component.scss'],
})
export class CoursesDetailsComponent implements OnInit {
  courseID: string;
  chapters: Observable<Chapter[]>;
  numOfChapters: number;

  constructor(
    private route: ActivatedRoute,
    private matDialog: MatDialog,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    this.courseID = this.route.snapshot.paramMap.get('id');
    this.chapters = this.coursesService
      .getChapters(this.courseID)
      .pipe(tap((chapters) => (this.numOfChapters = chapters.length)));
  }

  onAddChapter() {
    this.matDialog.open(CreateNewChapterDialogComponent, {
      data: {
        courseID: this.courseID,
        dialogTitle: `Add a New Chapter`,
        button: 'Add Chapter',
        numOfChapters: this.numOfChapters,
      },
    });
  }
}
