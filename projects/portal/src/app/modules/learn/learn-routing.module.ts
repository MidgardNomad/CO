import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LearnComponent } from './learn.component';
import { CourseComponent } from './components/course/course.component';
import { LectureComponent } from './components/lecture/lecture.component';
import { LearnCourseResolver } from '../../reslovers/learn/learn-course.resolver';
import { LearnSlidesResolver } from '../../reslovers/learn/learn-lecture.resolver';
import { CourseLearnGuard } from '../../guards/learn-course.guard';

const routes: Routes = [
  {
    path: '',
    component: LearnComponent,
    children: [
      {
        path: '',
        redirectTo: '/courses',
        pathMatch: 'full',
      },
      {
        //temp use The course ID until I implement the course Name property
        path: 'course/:courseID',
        resolve: { course: LearnCourseResolver },
        canActivate: [CourseLearnGuard],
        component: CourseComponent,
      },
      {
        path: 'course/:courseID/chapter/:chapterID/lecture/:lectureID',
        resolve: {
          slides: LearnSlidesResolver,
        },
        component: LectureComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearnRoutingModule {}
