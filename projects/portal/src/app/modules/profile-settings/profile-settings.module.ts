import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

import { ProfileSettingsRoutingModule } from './profile-settings-routing.module';
import { ProfileSettingsComponent } from './profile-settings.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ConnectedAccountsComponent } from './components/connected-accounts/connected-accounts.component';
import { ReauthenticateDialogComponent } from './components/reauthenticate-dialog/reauthenticate-dialog.component';
import { DeleteAccountComponent } from './components/delete-account/delete-account.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ProComponent } from './components/pro/pro.component';
import { DeletePhotoDialogComponent } from './components/delete-photo-dialog/delete-photo-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdatePhotoDialogComponent } from './components/update-photo-dialog/update-photo-dialog.component';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [
    ProfileSettingsComponent,
    ChangePasswordComponent,
    ConnectedAccountsComponent,
    DashboardComponent,
    ReauthenticateDialogComponent,
    DeleteAccountComponent,
    EditProfileComponent,
    LogoutComponent,
    ProComponent,
    DeletePhotoDialogComponent,
    UpdatePhotoDialogComponent,
  ],
  imports: [
    CommonModule,
    NgIf,
    ProfileSettingsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    NgxDropzoneModule,
  ],
})
export class ProfileSettingsModule {}
