import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareerRoutingModule } from './career-routing.module';
import { CareerComponent } from './career.component';
import { CareerDetailsComponent } from './component/career-details/career-details.component';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CareerListComponent } from './component/career-list/career-list.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CourseCardComponent } from '../courses/components/courses-details/course-card/course-card.component';
import { CoursesModule } from '../courses/courses.module';

@NgModule({
  declarations: [
    CareerComponent,
    CareerListComponent,
    CareerDetailsComponent,
    
  ],
  imports: [
    CommonModule,
    CareerRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatTooltipModule,
    CoursesModule
  ]
})

export class CareerModule {

}


