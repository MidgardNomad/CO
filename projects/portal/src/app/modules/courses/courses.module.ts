import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [CoursesComponent, CourseCardComponent],
  imports: [CommonModule, SharedModule, CoursesRoutingModule],
})
export class CoursesModule {}
