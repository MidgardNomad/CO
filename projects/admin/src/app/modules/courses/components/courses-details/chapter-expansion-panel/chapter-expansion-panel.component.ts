import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Chapter, CoursesService, Lecture } from 'DAL';
import { ChapterDialogComponent } from '../chapter-dialog/chapter-dialog.component';
import { Observable, Subscription, tap } from 'rxjs';
import { LectureDialogComponent } from '../../lectures/lecture-dialog/lecture-dialog.component';
import { DeleteDialogComponent } from 'projects/admin/src/app/modal/delete-dialog/delete-dialog.component';
// import { Chapter, CoursesService, Lecture } from 'projects/dal/src/public-api';

@Component({
  selector: 'app-chapter-expansion-panel',
  templateUrl: './chapter-expansion-panel.component.html',
  styleUrls: ['./chapter-expansion-panel.component.scss'],
})
export class ChapterExpansionPanelComponent implements OnInit {
  //=============================================================
  //Properties
  lectures: Observable<Lecture[]>;
  numberOfLectures: number;
  @Input('chapter') chapter: Chapter;
  deleteDialgoSub: Subscription;
  //=============================================================

  constructor(
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.lectures = this.coursesService
      .getAllLectures(this.route.snapshot.paramMap.get('id'), this.chapter.id)
      .pipe(tap((lectures) => (this.numberOfLectures = lectures.length)));
  }

  onEditChapter() {
    this.matDialog.open(ChapterDialogComponent, {
      disableClose: true,
      data: {
        courseID: this.route.snapshot.paramMap.get('id'),
        chapterID: this.chapter.id,
        chapterTitle: this.chapter.title,
        chapterDescription: this.chapter.description,
        dialogTitle: `Update ${this.chapter.title} Info`,
        button: 'Save Changes',
      },
    });
  }

  onDeleteChapter() {
    this.deleteDialgoSub = this.matDialog
      .open(DeleteDialogComponent, {
        data: { messageTail: 'Chapter' },
        disableClose: true,
      })
      .afterClosed()
      .subscribe(async (action) => {
        if (action) {
          try {
            await this.coursesService.deleteChapter(
              this.route.snapshot.paramMap.get('id'),
              this.chapter.id
            );
          } catch (error) {
            console.log(error);
          }
        }
      });
  }

  onAddLecture() {
    this.matDialog.open(LectureDialogComponent, {
      disableClose: true,
      data: {
        courseID: this.route.snapshot.paramMap.get('id'),
        chapterID: this.chapter.id,
        chapterTitle: this.chapter.title,
        seqNo: this.numberOfLectures + 1,
      },
    });
  }

  onEditLecture(lectureID: string) {
    this.matDialog.open(LectureDialogComponent, {
      disableClose: true,
      data: {
        lectureID,
        chapterID: this.chapter.id,
        courseID: this.route.snapshot.paramMap.get('id'),
      },
    });
  }
  onDeleteLecture(lectureID: string) {
    let matDialogRef = this.matDialog.open(DeleteDialogComponent, {
      data: { messageTail: 'Lecture' },
      disableClose: true,
    });
    matDialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        try {
          await this.coursesService.deleteLecture(
            this.route.snapshot.paramMap.get('id'),
            this.chapter.id,
            lectureID
          );
        } catch (error) {
          console.log(error);
        }
      }
    });
  }
}
