import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { FaqComponent } from './component/faq/faq.component';
import { AboutPageComponent } from './component/about-page/about-page.component';
import { ReportComponent } from './component/report/report/report.component';

@NgModule({
  declarations: [AboutComponent, FaqComponent, AboutPageComponent, ReportComponent],
  imports: [CommonModule, AboutRoutingModule],
})
export class AboutModule {}
