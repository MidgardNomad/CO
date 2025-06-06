import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { HeaderComponent } from './header/header.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PasswordStrengthComponent } from './password-strength-meter/password-strength-meter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';
import { PaymentReminderComponent } from './payment-reminder/payment-reminder.component';
import { SubscriptionDetailsComponent } from '../modules/subscription/components/subscription-details/subscription-details.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    LoadingSpinnerComponent,
    PasswordStrengthComponent,
    PaymentReminderComponent,
    SubscriptionDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    LoadingSpinnerComponent,
    PasswordStrengthComponent,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PaymentReminderComponent
  ],
})
export class SharedModule {}
