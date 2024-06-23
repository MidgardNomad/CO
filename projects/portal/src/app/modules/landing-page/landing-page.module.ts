import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';

@NgModule({
  declarations: [
    LandingPageComponent,
    MainPageComponent
  ],

  imports: [
    CommonModule,
    LandingPageRoutingModule
  ]
})

export class LandingPageModule { }
