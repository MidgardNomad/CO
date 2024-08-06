import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewCareerComponent } from './add-new-career/add-new-career.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { EditCareerComponent } from './edit-career/edit-career.component';
import { DeleteCareerComponent } from './delete-career/delete-career.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

import { MatButtonModule } from '@angular/material/button';
import { CareerDetailsDialogComponent } from './career-details-dialog/career-details-dialog.component';
import { VerifyPhoneNumberComponent } from './verify-phone-number/verify-phone-number.component';
import { NgOtpInputModule } from 'ng-otp-input';

import { MentorDialogComponent } from './mentor-dialog/mentor-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MentorScheduleDialogComponent } from './mentor-schedule-dialog/mentor-schedule-dialog.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AddNewCareerComponent,
    EditCareerComponent,
    DeleteCareerComponent,
    DeleteDialogComponent,
    CareerDetailsDialogComponent,
    VerifyPhoneNumberComponent,
    MentorDialogComponent,
    MentorScheduleDialogComponent,
    VerifyPhoneNumberComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgOtpInputModule,

    MatDatepickerModule,
    MatSelectModule,
  ],
})
export class ModalModule {}
