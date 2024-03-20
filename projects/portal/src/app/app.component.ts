import { Component, inject } from '@angular/core';
import { DALService, CrudService, Lesson } from 'DAL';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portal';

  constructor(private crudService: CrudService) {
    // set the collection name on calling the service
    crudService.collectionName = 'admins';
    // get all data
    crudService.getData().then((data: any) => {
      console.log(data);
    }
    );

    this.getProfile();

    // get all data
    crudService.getData().then((data: any) => {
      console.log(data);
    }
    );
  }




    getProfile(){
    this.crudService.collectionName = 'profile';

      // get single data
      this.crudService.getSingleData('1').subscribe((data: any) => {
        console.log(data);
      });
    }



  }

  
