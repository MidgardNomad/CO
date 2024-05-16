import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivacyPolicyComponent } from './privacy-policy.component';
import { PrivacyPageComponent } from './components/privacy-page/privacy-page.component';

const routes: Routes = [
  {
    path: '',
    component: PrivacyPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivacyPolicyRoutingModule { }
