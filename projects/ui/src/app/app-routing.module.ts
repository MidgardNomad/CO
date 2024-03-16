import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    loadChildren: () =>
    import('./modules/landing-page/landing-page.module').then(
      (m) => m.LandingPageModule,
    ),
  },
  {
    path:'auth',
    loadChildren: () =>
    import('./modules/auth/auth.module').then(
      (m) => m.AuthModule,
    ),
  },
  {
    path:'profile',
    loadChildren: () =>
    import('./modules/profile/profile.module').then(
      (m) => m.ProfileModule,
    ),
  },
  {
    path:'courses',
    loadChildren: () =>
    import('./modules/courses/courses.module').then(
      (m) => m.CoursesModule,
    ),
  },
  {
    path:'dashboard',
    loadChildren: () =>
    import('./modules/dashboard/dashboard.module').then(
      (m) => m.DashboardModule,
    ),
  },
  {
    path:'about',
    loadChildren: () =>
    import('./modules/about/about.module').then(
      (m) => m.AboutModule,
    ),
  },
  {
    path:'contactUS',
    loadChildren: () =>
    import('./modules/contactus/contactus.module').then(
      (m) => m.ContactusModule,
    ),
  },
  {
    path:'blogs',
    loadChildren: () =>
    import('./modules/blogs/blogs.module').then(
      (m) => m.BlogsModule,
    ),
  },
  {
    path:'privacy',
    loadChildren: () =>
    import('./modules/privacy-policy/privacy-policy.module').then(
      (m) => m.PrivacyPolicyModule,
    ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
