import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { FaqComponent } from './components/faq/faq.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AboutComponent,
    AboutPageComponent,
    FaqComponent,
    NotFoundComponent,
  ],
  imports: [CommonModule, AboutRoutingModule],
})
export class AboutModule {}
