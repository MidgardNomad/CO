import { NgModule } from '@angular/core';
import { DALComponent } from './dal.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment'; // Adjust the path based on your project structure
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { CoursesService } from './services/courses.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [DALComponent],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    HttpClientModule
  ],
  exports: [FormsModule],
  providers: [CoursesService],
})
export class DALModule {}
