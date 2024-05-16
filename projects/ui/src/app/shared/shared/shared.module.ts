import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PasswordStrengthComponent } from './password-strength-meter/password-strength-meter.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoadingSpinnerComponent,
    PasswordStrengthComponent,
  ],
  imports: [CommonModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoadingSpinnerComponent,
    PasswordStrengthComponent,
  ],
})
export class SharedModule {}
