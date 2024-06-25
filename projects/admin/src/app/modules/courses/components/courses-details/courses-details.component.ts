import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Chapter, CoursesService } from 'DAL';
import { ChapterDialogComponent } from './chapter-dialog/chapter-dialog.component';
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
    private coursesService: CoursesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.courseID = this.route.snapshot.paramMap.get('id');
    this.chapters = this.coursesService
      .getChapters(this.courseID)
      .pipe(tap((chapters) => (this.numOfChapters = chapters.length)));
  }

  onAddChapter() {
    this.matDialog.open(ChapterDialogComponent, {
      data: {
        courseID: this.courseID,
        dialogTitle: `Add a New Chapter`,
        button: 'Add Chapter',
        numOfChapters: this.numOfChapters,
      },
    });
  }

  goBack() {
    this.router.navigate(['/courses/list']);
  }
}
