import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearnRoutingModule } from './learn-routing.module';
import { LearnComponent } from './learn.component';
import { CourseComponent } from './components/course/course.component';
import { LectureComponent } from './components/lecture/lecture.component';
import { ChapterComponent } from './components/course/chapter/chapter.component';
import { ChapterLecturesComponent } from './components/course/chapter/chapter-lectures/chapter-lectures.component';
import { SharedModule } from '../../shared/shared.module';
import { TextSlideComponent } from './components/lecture/components/text-slide/text-slide.component';
import { TextImageSlideComponent } from './components/lecture/components/text-image-slide/text-image-slide.component';
import { McqSlideComponent } from './components/lecture/components/mcq-slide/mcq-slide.component';
import { FillSlideComponent } from './components/lecture/components/fill-slide/fill-slide.component';
import { ConfirmQuitLectureComponent } from './components/lecture/components/confirm-quit-lecture/confirm-quit-lecture.component';
import { ProjectComponent } from './components/project/project.component';
import { ProjectCardComponent } from './components/course/project-card/project-card.component';

@NgModule({
  declarations: [
    LearnComponent,
    CourseComponent,
    LectureComponent,
    ChapterComponent,
    ChapterLecturesComponent,
    TextSlideComponent,
    TextImageSlideComponent,
    McqSlideComponent,
    FillSlideComponent,
    ConfirmQuitLectureComponent,
    ProjectComponent,
    ProjectCardComponent,
  ],
  imports: [CommonModule, LearnRoutingModule, SharedModule],
})
export class LearnModule {}
