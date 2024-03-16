import { NgModule } from '@angular/core';
import { DALComponent } from './dal.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment'; // Adjust the path based on your project structure
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DALComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  exports: [
    FormsModule,
  ]
})
export class DALModule { }
