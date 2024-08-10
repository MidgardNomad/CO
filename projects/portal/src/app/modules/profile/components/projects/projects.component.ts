import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UserProject, UsersService } from 'DAL';
import { SubmitProjectDialogComponent } from './submit-project-dialog/submit-project-dialog.component';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  @Input() userName: string;
  @Input() showSubmissionForm: boolean;
  @Input() showSubmissionButton: boolean;
  @Input() userProjects: UserProject[] = [];
  constructor(private route: ActivatedRoute, private matDialog: MatDialog) {}

  ngOnInit(): void {}

  goToProjectRepo(link: string) {
    if (link.substring(0, 8) === 'https://') {
      window.open(link, '_blank');
    } else {
      link = 'https://' + link;
      window.open(link, '_blank');
    }
  }

  onSubmitProject() {
    this.matDialog.open(SubmitProjectDialogComponent, {
      data: { userID: this.route.snapshot.paramMap.get('uid') },
    });
  }
}
