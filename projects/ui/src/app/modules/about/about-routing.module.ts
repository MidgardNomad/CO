import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { FaqComponent } from './components/faq/faq.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RepottComponent } from './components/repott/repott.component';

const routes: Routes = [
  { path: '', component: AboutPageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'report', component: RepottComponent },
  { path: 'notFound', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutRoutingModule {}
