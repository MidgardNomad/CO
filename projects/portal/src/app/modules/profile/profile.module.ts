import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '../../shared/shared.module';
import { StreakComponent } from './components/streak/streak.component';
import { UserCoursesComponent } from './components/user-courses/user-courses.component';
import { SessionsComponent } from './components/sessions/sessions.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SessionCardComponent } from './components/sessions/session-card/session-card.component';
import { BookSessionDialogComponent } from './components/sessions/book-session-dialog/book-session-dialog.component';
import { CourseCardComponent } from './components/user-courses/course-card/course-card.component';

@NgModule({
  declarations: [ProfileComponent, StreakComponent, UserCoursesComponent, SessionsComponent, ProjectsComponent, SessionCardComponent, BookSessionDialogComponent, CourseCardComponent],
  imports: [CommonModule, ProfileRoutingModule, SharedModule],
})
export class ProfileModule {}
