import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { DALService, CrudService, AuthService } from 'DAL';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'portal';

  constructor(
    private crudService: CrudService,
    private authService: AuthService
  ) {
    // set the collection name on calling the service
    // crudService.collectionName = 'admins';
    // // get all data
    // crudService.getData().then((data: any) => {
    //   console.log(data);
    // });
    // this.getProfile();
    // // get all data
    // crudService.getData().then((data: any) => {
    //   console.log(data);
    // });
  }

  ngOnInit(): void {
    this.authService.user.subscribe((user) => console.log(user));
  }

  // getProfile() {
  //   this.crudService.collectionName = 'profile';

  //   // get single data
  //   this.crudService.getSingleData('1').subscribe((data: any) => {
  //     console.log(data);
  //   });
  // }

  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
    if (!this.authService.getStayLoggedIn) {
      this.authService.logout();
    }
  }
}
