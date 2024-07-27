import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MentorsComponent } from './mentors.component';
import { MentorsResolver } from '../../core/resolvers/mentors.resolver';
import { MentorProfileComponent } from './components/mentor-profile/mentor-profile.component';
import { MentorProfileResolver } from '../../core/resolvers/mentor.resolver';

const routes: Routes = [
  {
    path: '',
    component: MentorsComponent,
    resolve: { mentorsList: MentorsResolver },
  },
  {
    path: ':id',
    component: MentorProfileComponent,
    resolve: { mentor: MentorProfileResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MentorsRoutingModule {}
