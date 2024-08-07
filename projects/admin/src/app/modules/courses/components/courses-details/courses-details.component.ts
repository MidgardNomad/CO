import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Chapter, CoursesService } from 'DAL';
import { ChapterDialogComponent } from './chapter-dialog/chapter-dialog.component';
import { Observable, tap } from 'rxjs';
import { AddProjectComponent } from '../courses-list/course-dialog/add-project/add-project.component';
import { Projects } from 'DAL';
import { RemovCardComponent } from './project-mod/remov-card/remov-card.component';
import { EditCardComponent } from './project-mod/edit-card/edit-card.component';

@Component({
  selector: 'app-courses-details',
  templateUrl: './courses-details.component.html',
  styleUrls: ['./courses-details.component.scss'],
})
export class CoursesDetailsComponent implements OnInit {
  courseID: string;

  chapters: Observable<Chapter[]>;
  numOfChapters: number;
  cards: Array<Projects> = [];

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
    this.coursesService.getDataProject(this.courseID).subscribe((data) => {
      this.cards = data;
    });
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
  // Button Add Project
  onAddProject() {
    const dialogRef = this.matDialog.open(AddProjectComponent, {
      disableClose: true,
      width: '50%',
      data: {
        projectID: this.courseID,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.coursesService.addProjects(this.courseID, result);
      }
    });
  }
  // Remove Card For Project
  deleteCard(card: any) {
    const dialogRef = this.matDialog.open(RemovCardComponent, {
      disableClose: true,
      data: { ...card },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.coursesService.deletProject(this.courseID, card.id);
    });
  }
  // Edit Card For Project
  editCard(card: any) {
    const dialogRef = this.matDialog.open(EditCardComponent, {
      disableClose: true,
      data: { ...card },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.coursesService.editCard(this.courseID, result.id, result.title);
      }
    });
  }
}
