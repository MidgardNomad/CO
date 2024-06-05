import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesDetailsComponent } from './components/courses-details/courses-details.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { NewCourseDialogComponent } from './components/courses-list/new-course-dialog/new-course-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { DeleteCourseDialogComponent } from './components/course-card/delete-course-dialog/delete-course-dialog.component';
import { CreateNewChapterDialogComponent } from './components/courses-details/create-new-chapter-dialog/create-new-chapter-dialog.component';
import { DeleteChapterDialogComponent } from './components/courses-details/delete-chapter-dialog/delete-chapter-dialog.component';
import { ChapterExpansionPanelComponent } from './components/courses-details/chapter-expansion-panel/chapter-expansion-panel.component';
import { AddLectureDialogComponent } from './components/add-lecture-dialog/add-lecture-dialog.component';
import { LecturesComponent } from './components/lectures/lectures.component';
import { ConfirmLectureDeletionDialogComponent } from './components/confirm-lecture-deletion-dialog/confirm-lecture-deletion-dialog.component';
import { AddSlideDialogComponent } from './components/lectures/add-slide-dialog/add-slide-dialog.component';
import { DeleteSlideDialogComponent } from './components/lectures/delete-slide-dialog/delete-slide-dialog.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { TextSlideComponent } from './components/lectures/text-slide/text-slide.component';
import { TextImageSlideComponent } from './components/lectures/text-image-slide/text-image-slide.component';
import { McqSlideComponent } from './components/lectures/mcq-slide/mcq-slide.component';
import { FillSlideComponent } from './components/lectures/fill-slide/fill-slide.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CoursesListComponent,
    CoursesDetailsComponent,
    CourseCardComponent,
    NewCourseDialogComponent,
    DeleteCourseDialogComponent,
    CreateNewChapterDialogComponent,
    DeleteChapterDialogComponent,
    ChapterExpansionPanelComponent,
    AddLectureDialogComponent,
    LecturesComponent,
    ConfirmLectureDeletionDialogComponent,
    AddSlideDialogComponent,
    DeleteSlideDialogComponent,
    TextSlideComponent,
    TextImageSlideComponent,
    McqSlideComponent,
    FillSlideComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoursesRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatExpansionModule,
    MatSelectModule,
    NgxFileDropModule,
  ],
})
export class CoursesModule {}
