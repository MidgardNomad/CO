import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';

const routes: Routes = [
  { path: '', redirectTo:'list',pathMatch:'full' },
  { path: 'list', component: StudentListComponent },
  { path: ':id', component: StudentDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
