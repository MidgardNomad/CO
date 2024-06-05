import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MentorsComponent } from './mentors.component';
import { MentorDetailsComponent } from './components/mentor-details/mentor-details.component';
import { MentorsListComponent } from './components/mentors-list/mentors-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: MentorsListComponent,
  },
  {
    path: ':id',
    component: MentorDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MentorsRoutingModule {}
