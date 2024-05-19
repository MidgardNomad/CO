import { Component, OnInit } from '@angular/core';
import { AuthService, CrudService } from 'DAL';
import { User } from 'projects/dal/src/lib/models/user/user';

import { UserService } from 'projects/dal/src/lib/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getActiveUser;
    console.log(this.user);
  }
}
