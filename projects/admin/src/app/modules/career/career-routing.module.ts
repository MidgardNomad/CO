import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CareerComponent } from './career.component';
import { CareerListComponent } from './component/career-list/career-list.component';
import { CareerDetailsComponent } from './component/career-details/career-details.component';
import { CareerList2Component } from './component/career-list-2/career-list-2.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: CareerListComponent },
  { path: 'list2', component: CareerList2Component },
  { path: ':id', component: CareerDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CareerRoutingModule { }
