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

import {MatButtonModule} from '@angular/material/button';
import { CareerDetailsDialogComponent } from './career-details-dialog/career-details-dialog.component';


@NgModule({
  declarations: [AddNewCareerComponent, EditCareerComponent, DeleteCareerComponent, DeleteDialogComponent, CareerDetailsDialogComponent],
  imports: [
    CommonModule,
    MatFormFieldModule, MatInputModule,
    FormsModule,MatDialogModule,ReactiveFormsModule,MatButtonModule
  ]
})
export class ModalModule { }
