import { Component, OnInit } from '@angular/core';
import { UsersService } from 'DAL';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private usersService: UsersService) {}

  async ngOnInit() {    
    await this.usersService.getUser();
  }  
}
