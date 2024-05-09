import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileSettingsRoutingModule } from './profile-settings-routing.module';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ConnectedAccountsComponent } from './components/connected-accounts/connected-accounts.component';
import { ProComponent } from './components/pro/pro.component';
import { LogoutComponent } from './components/logout/logout.component';
import { DeleteAccountComponent } from './components/delete-account/delete-account.component';
import { ProfileSettingsComponent } from './profile-settings.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared/shared.module';

@NgModule({
  declarations: [
    EditProfileComponent,
    ConnectedAccountsComponent,
    ProComponent,
    LogoutComponent,
    DeleteAccountComponent,
    ProfileSettingsComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    ProfileSettingsRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class ProfileSettingsModule {}
