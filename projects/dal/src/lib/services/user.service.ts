import { Injectable } from '@angular/core';
import { User } from '../models/user/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private activeUser: User;

  constructor() {}
  //getters
  get getActiveUser() {
    return { ...this.activeUser };
  }

  //setters
  set setActiveUser(newUser: User) {
    this.activeUser = newUser;
  }
}
