import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileSettingsComponent } from './profile-settings.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ConnectedAccountsComponent } from './components/connected-accounts/connected-accounts.component';
import { ProComponent } from './components/pro/pro.component';
import { LogoutComponent } from './components/logout/logout.component';
import { DeleteAccountComponent } from './components/delete-account/delete-account.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileSettingsComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, title: 'Dashboard' },
      {
        path: 'edit-profile',
        component: EditProfileComponent,
        title: 'Edit Profile Info',
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
        title: 'Change Password',
      },
      {
        path: 'connected-accounts',
        component: ConnectedAccountsComponent,
        title: 'Connected Accounts',
      },
      { path: 'pro', component: ProComponent, title: 'PRO' },
      { path: 'logout', component: LogoutComponent, title: 'Logout' },
      {
        path: 'delete-account',
        component: DeleteAccountComponent,
        title: 'Delete Account',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileSettingsRoutingModule {}
