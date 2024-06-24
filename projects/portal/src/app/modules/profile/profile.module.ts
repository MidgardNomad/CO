import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '../../shared/shared.module';
import { StreakComponent } from './components/streak/streak.component';
import { UserCoursesComponent } from './components/user-courses/user-courses.component';

@NgModule({
  declarations: [ProfileComponent, StreakComponent, UserCoursesComponent],
  imports: [CommonModule, ProfileRoutingModule, SharedModule],
})
export class ProfileModule {}
