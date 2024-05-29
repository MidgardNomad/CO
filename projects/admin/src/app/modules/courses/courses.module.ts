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
import { FormsModule } from '@angular/forms';
import { DeleteCourseDialogComponent } from './components/course-card/delete-course-dialog/delete-course-dialog.component';
import { CreateNewChapterDialogComponent } from './components/courses-details/create-new-chapter-dialog/create-new-chapter-dialog.component';
import { DeleteChapterDialogComponent } from './components/courses-details/delete-chapter-dialog/delete-chapter-dialog.component';
import { EditChapterDialogComponent } from './components/courses-details/edit-chapter-dialog/edit-chapter-dialog.component';
import { ChapterExpansionPanelComponent } from './components/courses-details/chapter-expansion-panel/chapter-expansion-panel.component';
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
    EditChapterDialogComponent,
    ChapterExpansionPanelComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoursesRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatExpansionModule,
  ],
})
export class CoursesModule {}
