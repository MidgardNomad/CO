import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LearnComponent } from './learn.component';
import { CourseComponent } from './components/course/course.component';
import { LectureComponent } from './components/lecture/lecture.component';

const routes: Routes = [
  {
    path: '',
    component: LearnComponent,
    children: [
      //Move The courses Module inside the Learn Module.
      //Redirct To the component That displays all The Courses for the user to enroll
      // {
      //   path: '',
      //   redirectTo: '/courses',
      //   pathMatch: 'full'
      // },
      {
        //temp use The course ID until I implement the course Name property
        path: 'course/:courseID',
        component: CourseComponent,
      },
      {
        path: 'course/:courseID/lecture/:lectureID',
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
