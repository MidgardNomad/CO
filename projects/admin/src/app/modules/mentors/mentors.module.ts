import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MentorsRoutingModule } from './mentors-routing.module';
import { MentorsComponent } from './mentors.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { AgePipe } from '../../core/pipes/age.pipe';
import { MentorProfileComponent } from './components/mentor-profile/mentor-profile.component';
import { AddImageComponent } from './components/mentor-profile/add-image/add-image.component';

@NgModule({
  declarations: [
    MentorsComponent,
    MentorProfileComponent,
    AgePipe,
    AddImageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
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
