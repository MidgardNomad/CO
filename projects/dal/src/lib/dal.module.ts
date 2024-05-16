import { NgModule } from '@angular/core';
import { DALComponent } from './dal.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment'; // Adjust the path based on your project structure
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

@NgModule({
  declarations: [DALComponent],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
  ],
  exports: [FormsModule],
})
export class DALModule {}
