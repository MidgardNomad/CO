import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewCareerComponent } from './add-new-career/add-new-career.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [AddNewCareerComponent],
  imports: [
    CommonModule,
    MatFormFieldModule, MatInputModule,
    FormsModule,MatDialogModule,ReactiveFormsModule
  ]
})
export class ModalModule { }
