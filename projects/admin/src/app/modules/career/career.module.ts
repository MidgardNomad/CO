import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareerRoutingModule } from './career-routing.module';
import { CareerComponent } from './career.component';
import { CareerListComponent } from './component/career-list/career-list.component';
import { CareerDetailsComponent } from './component/career-details/career-details.component';


@NgModule({
  declarations: [
    CareerComponent,
    CareerListComponent,
    CareerDetailsComponent
  ],
  imports: [
    CommonModule,
    CareerRoutingModule
  ]
})
export class CareerModule { }
