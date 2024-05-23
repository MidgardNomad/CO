import { Component, OnInit } from '@angular/core';
import { User } from 'projects/dal/src/lib/models/user/user';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: Observable<User>;
  constructor() {}

  ngOnInit(): void {}
}
