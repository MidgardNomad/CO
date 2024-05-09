import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../landing-page/landing-page.module').then(
            (m) => m.LandingPageModule
          ),
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('../auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'courses',
        loadChildren: () =>
          import('../courses/courses.module').then((m) => m.CoursesModule),
      },

      {
        path: 'about',
        loadChildren: () =>
          import('../about/about.module').then((m) => m.AboutModule),
      },
      {
        path: 'contactUS',
        loadChildren: () =>
          import('../contactus/contactus.module').then(
            (m) => m.ContactusModule
          ),
      },
      {
        path: 'blogs',
        loadChildren: () =>
          import('../blogs/blogs.module').then((m) => m.BlogsModule),
      },
      {
        path: 'privacy',
        loadChildren: () =>
          import('../privacy-policy/privacy-policy.module').then(
            (m) => m.PrivacyPolicyModule
          ),
      },
      {
        path: 'dboard',
        loadChildren: () =>
          import('../dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'profile-settings',
        loadChildren: () =>
          import('../profile-settings/profile-settings.module').then(
            (m) => m.ProfileSettingsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
