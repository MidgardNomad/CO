import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesDetailsComponent } from './components/courses-details/courses-details.component';


@NgModule({
  declarations: [
    CoursesComponent,
    CoursesListComponent,
    CoursesDetailsComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule
  ]
})
export class CoursesModule { }
