import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { FaqComponent } from './component/faq/faq.component';
import { AboutPageComponent } from './component/about-page/about-page.component';

@NgModule({
  declarations: [AboutComponent, FaqComponent, AboutPageComponent],
  imports: [CommonModule, AboutRoutingModule],
})
export class AboutModule {}
