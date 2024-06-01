import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Chapter, CoursesService, Lecture } from 'DAL';
import { DeleteChapterDialogComponent } from '../delete-chapter-dialog/delete-chapter-dialog.component';
import { CreateNewChapterDialogComponent } from '../create-new-chapter-dialog/create-new-chapter-dialog.component';
import { AddLectureDialogComponent } from '../../add-lecture-dialog/add-lecture-dialog.component';
import { Observable, tap } from 'rxjs';
import { ConfirmLectureDeletionDialogComponent } from '../../confirm-lecture-deletion-dialog/confirm-lecture-deletion-dialog.component';
import { P } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-chapter-expansion-panel',
  templateUrl: './chapter-expansion-panel.component.html',
  styleUrls: ['./chapter-expansion-panel.component.scss'],
})
export class ChapterExpansionPanelComponent implements OnInit {
  lectures: Observable<Lecture[]>;
  numberOfLectures: number;
  @Input('chapter') chapter: Chapter;

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
    this.matDialog.open(CreateNewChapterDialogComponent, {
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
    let matDialogRef = this.matDialog.open(DeleteChapterDialogComponent, {
      data: { title: this.chapter.title },
      disableClose: true,
    });
    matDialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
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
    this.matDialog.open(AddLectureDialogComponent, {
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
    this.matDialog.open(AddLectureDialogComponent, {
      disableClose: true,
      data: {
        lectureID,
        chapterID: this.chapter.id,
        courseID: this.route.snapshot.paramMap.get('id'),
      },
    });
  }
  onDeleteLecture(lectureID: string) {
    let matDialogRef = this.matDialog.open(
      ConfirmLectureDeletionDialogComponent,
      {
        disableClose: true,
      }
    );
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
