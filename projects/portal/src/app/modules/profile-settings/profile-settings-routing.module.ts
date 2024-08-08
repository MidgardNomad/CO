import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileSettingsComponent } from './profile-settings.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ProComponent } from './components/pro/pro.component';
import { LogoutComponent } from './components/logout/logout.component';
import { DeleteAccountComponent } from './components/delete-account/delete-account.component';
import { ConnectedAccountsComponent } from './components/connected-accounts/connected-accounts.component';
import { UserResovler } from '../../reslovers/user.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProfileSettingsComponent,

    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'edit-profile',
        resolve: { user: UserResovler },
        component: EditProfileComponent,
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
      },
      {
        path: 'connected-accounts',
        component: ConnectedAccountsComponent,
      },
      {
        path: 'pro',
        component: ProComponent,
      },
      {
        path: 'logout',
        component: LogoutComponent,
      },
      {
        path: 'delete-account',
        component: DeleteAccountComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileSettingsRoutingModule {}
