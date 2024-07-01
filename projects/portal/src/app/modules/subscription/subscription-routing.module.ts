import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscriptionsListComponent } from './components/subscriptions-list/subscriptions-list.component';
import { SubscriptionDetailsComponent } from './components/subscription-details/subscription-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'pay',
    pathMatch:'full',
  },
  {
    path:'list',
    component:SubscriptionsListComponent
  },
  {
    path:'pay',
    component:SubscriptionDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionRoutingModule {}
