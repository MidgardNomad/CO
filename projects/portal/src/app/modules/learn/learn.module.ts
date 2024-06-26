import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearnRoutingModule } from './learn-routing.module';
import { LearnComponent } from './learn.component';
import { CourseComponent } from './components/course/course.component';
import { LectureComponent } from './components/lecture/lecture.component';

@NgModule({
  declarations: [LearnComponent, CourseComponent, LectureComponent],
  imports: [CommonModule, LearnRoutingModule],
})
export class LearnModule {}
