import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MentorsRoutingModule } from './mentors-routing.module';
import { MentorsComponent } from './mentors.component';
import { MentorsListComponent } from './components/mentors-list/mentors-list.component';
import { MentorDetailsComponent } from './components/mentor-details/mentor-details.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddComponent } from './components/mentors-list/add/add.component';
import { DeletComponent } from './components/mentors-list/delet/delet.component';
import { EditComponent } from './components/mentors-list/edit/edit.component';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    MentorsComponent,
    MentorsListComponent,
    MentorDetailsComponent,
    AddComponent,
    DeletComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    MentorsRoutingModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTableModule,
  ],
})
export class MentorsModule {}
