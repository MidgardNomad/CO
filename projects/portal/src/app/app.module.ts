import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DALModule } from 'DAL';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, DALModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
