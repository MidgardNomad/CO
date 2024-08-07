import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesDetailsComponent } from './components/courses-details/courses-details.component';
import { CourseCardComponent } from './components/courses-details/course-card/course-card.component';
import { CourseDialogComponent } from './components/courses-list/course-dialog/course-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChapterDialogComponent } from './components/courses-details/chapter-dialog/chapter-dialog.component';
import { ChapterExpansionPanelComponent } from './components/courses-details/chapter-expansion-panel/chapter-expansion-panel.component';
import { LecturesComponent } from './components/lectures/lectures.component';
import { AddSlideDialogComponent } from './components/lectures/add-slide-dialog/add-slide-dialog.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { TextSlideComponent } from './components/lectures/text-slide/text-slide.component';
import { TextImageSlideComponent } from './components/lectures/text-image-slide/text-image-slide.component';
import { McqSlideComponent } from './components/lectures/mcq-slide/mcq-slide.component';
import { FillSlideComponent } from './components/lectures/fill-slide/fill-slide.component';
import { LectureDialogComponent } from './components/lectures/lecture-dialog/lecture-dialog.component';
import { EditSlideDialogComponent } from './components/lectures/edit-slide-dialog/edit-slide-dialog.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AddProjectComponent } from './components/courses-list/course-dialog/add-project/add-project.component';
import { ProjectModComponent } from './components/courses-details/project-mod/project-mod.component';
import { MatIconModule } from '@angular/material/icon';
import { RemovCardComponent } from './components/courses-details/project-mod/remov-card/remov-card.component';
import { MatButtonModule } from '@angular/material/button';
import { ContentProjectComponent } from './components/courses-details/project-mod/content-dialoge/content-project.component';
import { EditCardComponent } from './components/courses-details/project-mod/edit-card/edit-card.component';
import { EditContentComponent } from './components/courses-details/project-mod/edit-content/edit-content.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    CoursesComponent,
    CoursesListComponent,
    CoursesDetailsComponent,
    CourseCardComponent,
    CourseDialogComponent,
    ChapterDialogComponent,
    ChapterExpansionPanelComponent,
    LectureDialogComponent,
    LecturesComponent,
    AddSlideDialogComponent,
    TextSlideComponent,
    TextImageSlideComponent,
    McqSlideComponent,
    FillSlideComponent,
    EditSlideDialogComponent,
    AddProjectComponent,
    ProjectModComponent,
    RemovCardComponent,
    ContentProjectComponent,
    EditCardComponent,
    EditContentComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoursesRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatExpansionModule,
    MatSelectModule,
    NgxFileDropModule,
    EditorModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
  ],
  exports: [CourseCardComponent],
})
export class CoursesModule {}
