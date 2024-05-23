import { Component, OnInit } from '@angular/core';
import { User } from 'dist/dal/lib/models/user/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  userData: User;

  constructor() {}

  ngOnInit(): void {}
}
