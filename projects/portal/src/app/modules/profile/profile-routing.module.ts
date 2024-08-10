import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { UserProfileResolver } from '../../reslovers/profile/profile.resolver';
import { CoursesResolver } from '../../reslovers/coursess/courses.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    resolve: { userData: UserProfileResolver },
  },
  {
    path: ':uid',
    resolve: { userData: UserProfileResolver, courses: CoursesResolver },
    component: ProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
