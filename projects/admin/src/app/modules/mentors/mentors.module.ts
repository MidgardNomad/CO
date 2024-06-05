import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MentorsRoutingModule } from './mentors-routing.module';
import { MentorsComponent } from './mentors.component';
import { MentorsListComponent } from './components/mentors-list/mentors-list.component';
import { MentorDetailsComponent } from './components/mentor-details/mentor-details.component';


@NgModule({
  declarations: [
    MentorsComponent,
    MentorsListComponent,
    MentorDetailsComponent
  ],
  imports: [
    CommonModule,
    MentorsRoutingModule
  ]
})
export class MentorsModule { }
