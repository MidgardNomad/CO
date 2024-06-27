import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearnRoutingModule } from './learn-routing.module';
import { LearnComponent } from './learn.component';
import { CourseComponent } from './components/course/course.component';
import { LectureComponent } from './components/lecture/lecture.component';
import { ChapterComponent } from './components/course/chapter/chapter.component';
import { ChapterLecturesComponent } from './components/course/chapter/chapter-lectures/chapter-lectures.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    LearnComponent,
    CourseComponent,
    LectureComponent,
    ChapterComponent,
    ChapterLecturesComponent,
  ],
  imports: [CommonModule, LearnRoutingModule, SharedModule],
})
export class LearnModule {}
