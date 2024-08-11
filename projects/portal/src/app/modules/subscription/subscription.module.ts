import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionRoutingModule } from './subscription-routing.module';
import { SubscriptionsListComponent } from './components/subscriptions-list/subscriptions-list.component';
import { SubscriptionDetailsComponent } from './components/subscription-details/subscription-details.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    SubscriptionsListComponent,
    
  ],
  imports: [
    CommonModule,
    SubscriptionRoutingModule,
    HttpClientModule
  ]
})
export class SubscriptionModule { }
