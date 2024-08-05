import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ReferenceFile } from 'aws-sdk/clients/omics';
import { CoursesService } from 'projects/dal/src/public-api';
import { ContentProjectComponent } from './content-dialoge/content-project.component';

@Component({
  selector: 'app-project-mod',
  templateUrl: './project-mod.component.html',
  styleUrls: ['./project-mod.component.scss'],
})
export class ProjectModComponent {
  project = [];
  courseID: string;
  constructor(private route: ActivatedRoute, private cs: CoursesService) {}
  ngOnInit() {
    this.courseID = this.route.snapshot.paramMap.get('id');
    this.cs
      .getDataProject(this.courseID)
      .subscribe((data) => [(this.project = data)]);
    console.log(this.courseID);
  }
}
