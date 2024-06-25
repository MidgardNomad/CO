import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { AddUserComponent } from './components/student-list/add-user/add-user.component';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CommonModule } from '@angular/common';
import { EeditUserComponent } from './components/student-list/Edit-user/edit-user.component';
import { DeletComponent } from './components/student-list/delet/delet.component';
import { StudentLiberComponent } from './components/student-list/student-liber/student-liber.component';
import { TestLearnDataComponent } from './components/student-list/test-learn-data/test-learn-data.component';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentListComponent,
    StudentDetailsComponent,
    AddUserComponent,
    EeditUserComponent,
    DeletComponent,
    StudentLiberComponent,
    TestLearnDataComponent,
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTooltipModule,
    MatTableModule,
  ],
})
export class StudentsModule {}
