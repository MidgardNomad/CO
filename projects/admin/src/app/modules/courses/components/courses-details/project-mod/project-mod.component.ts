import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService, ContentProject } from 'DAL';

import { EditContentComponent } from './edit-content/edit-content.component';

@Component({
  selector: 'app-project-mod',
  templateUrl: './project-mod.component.html',
  styleUrls: ['./project-mod.component.scss'],
})
export class ProjectModComponent {
  loding: boolean = false;
  project: ContentProject;
  courseID: string;
  projectID: string;
  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private matDialog: MatDialog,
    private cs: CoursesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loding = true;
    this.courseID = this.route.snapshot.paramMap.get('id');
    this.projectID = this.route.snapshot.paramMap.get('projectID');
    this.cs.getOneProject(this.courseID, this.projectID).subscribe((data) => {
      this.project = data;
      this.loding = false;
    });
    // this.content.innerHTML = this.project.content;
  }
  // Edit Content
  editContent(project: any) {
    const dialogRef = this.matDialog.open(EditContentComponent, {
      disableClose: true,
      data: { content: project.content, dataID: this.projectID },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // console.log('result', result);
        // console.log('project', this.projectID);
        this.coursesService.editContent(
          this.courseID,
          this.projectID,
          result.content
        );
      }
    });
  }
  // GoBack
  goBack() {
    this.router.navigate([`/courses/${this.courseID}`]);
  }
}
