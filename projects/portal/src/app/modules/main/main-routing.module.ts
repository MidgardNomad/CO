import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { LoggedoutGuard } from '../../guards/isLoggedout.guard';
import { LoggedinGuard } from '../../guards/isLoggedin.guard';
import { NotFoundComponent } from '../../shared/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        canActivate: [LoggedinGuard],
        loadChildren: () =>
          import('../landing-page/landing-page.module').then(
            (m) => m.LandingPageModule
          ),
      },
      {
        path: 'auth',
        canActivateChild: [LoggedinGuard],
        loadChildren: () =>
          import('../auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'profile',
        canActivate: [LoggedoutGuard],
        loadChildren: () =>
          import('../profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'profile-settings',
        canActivate: [LoggedoutGuard],
        loadChildren: () =>
          import('../profile-settings/profile-settings.module').then(
            (m) => m.ProfileSettingsModule
          ),
      },
      {
        path: 'learn',
        loadChildren: () =>
          import('../learn/learn.module').then((m) => m.LearnModule),
      },
      {
        path: 'about',
        loadChildren: () =>
          import('../about/about.module').then((m) => m.AboutModule),
      },
      {
        path: 'blogs',
        loadChildren: () =>
          import('../blogs/blogs.module').then((m) => m.BlogsModule),
      },
      {
        path: 'contact-us',
        loadChildren: () =>
          import('../contact-us/contact-us.module').then(
            (m) => m.ContactUsModule
          ),
      },
      {
        path: 'courses',
        loadChildren: () =>
          import('../courses/courses.module').then((m) => m.CoursesModule),
      },
      {
        path: 'privacy-policy',
        loadChildren: () =>
          import('../privacy-policy/privacy-policy.module').then(
            (m) => m.PrivacyPolicyModule
          ),
      },
      // {
      //   path: 'subscribe',
      //   loadChildren: () =>
      //     import('../subscription/subscription.module').then(
      //       (m) => m.SubscriptionModule
      //     ),
      // },
      {
        path: 'not-found',
        component: NotFoundComponent,
        data: { message: 'Page Not Found!' },
      },
      {
        path: '**',
        redirectTo: 'not-found',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
