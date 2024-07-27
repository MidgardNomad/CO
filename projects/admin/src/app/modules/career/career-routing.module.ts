import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CareerComponent } from './career.component';
import { CareerListComponent } from './component/career-list/career-list.component';
import { CareerDetailsComponent } from './component/career-details/career-details.component';
import { CareerSessionsComponent } from './component/career-sessions/career-sessions.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: CareerListComponent },
  { path: 'details/:id', component: CareerDetailsComponent },
  { path: 'details/:id/sessions', component: CareerSessionsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CareerRoutingModule {}
