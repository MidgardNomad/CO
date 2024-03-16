import { Component } from '@angular/core';
import { DALService } from 'DAL';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portal';

  constructor(private dalService: DALService) {
    this.dalService.getData();
  }

  
}
