import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserProject, UsersService } from 'DAL';
import { loadingAnimation } from 'projects/portal/src/app/shared/functions/loadingAnimation';
import { showSnackbar } from 'projects/portal/src/app/shared/functions/showsnackbar';

@Component({
  selector: 'app-submit-project-dialog',
  templateUrl: './submit-project-dialog.component.html',
  styleUrls: ['./submit-project-dialog.component.scss'],
})
export class SubmitProjectDialogComponent {
  isLoading = false;
  loadingAnimation = loadingAnimation();
  showSnackbar = showSnackbar();
  @ViewChild('loadingSpinner') loadindSpinner: ElementRef;
  @ViewChild('form') form: ElementRef;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { userID: string },
    private usersService: UsersService,
    private matDialogRef: MatDialogRef<SubmitProjectDialogComponent>
  ) {}
  async submitProject(projectForm: NgForm) {
    this.isLoading = true;
    this.loadingAnimation('block', 0.8, this.loadindSpinner, this.form);
    try {
      const { projectTitle, projectDescription, projectRepo } =
        projectForm.value;
      const project: UserProject = {
        projectTitle,
        projectDescription,
        projectRepo,
      } as UserProject;
      await this.usersService.submitProject(this.data.userID, project);
      this.isLoading = false;
      this.loadingAnimation('none', 1, this.loadindSpinner, this.form);
      this.matDialogRef.close();
      this.showSnackbar(
        'Project has been submitted Successfully',
        'success-snackbar'
      );
    } catch (error) {
      this.isLoading = false;
      this.loadingAnimation('none', 1, this.loadindSpinner, this.form);
      this.matDialogRef.close();
      this.showSnackbar(
        'Something went wrong! Please, try again later',
        'success-snackbar'
      );
    }
  }
}
