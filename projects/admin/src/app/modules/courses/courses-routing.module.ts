import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesDetailsComponent } from './components/courses-details/courses-details.component';
import { ChaptersResolver } from '../../core/resolvers/course-chapters.resolver';
import { CoursesResolver } from '../../core/resolvers/courses-resolver.resolver';
import { LecturesComponent } from './components/lectures/lectures.component';
import { ProjectModComponent } from './components/courses-details/project-mod/project-mod.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list',
    component: CoursesListComponent,
    resolve: { courses: CoursesResolver },
  },
  {
    path: ':id',
    component: CoursesDetailsComponent,
    resolve: { chapters: ChaptersResolver },
  },
  // test
  {
    path: ':id/project',
    component: ProjectModComponent,
    // resolve: { chapters: ChaptersResolver },
  },
  {
    path: ':id/chapter/:chapterID/lecture/:lectureID',
    component: LecturesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
