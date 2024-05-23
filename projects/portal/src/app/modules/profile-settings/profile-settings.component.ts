import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from 'projects/dal/src/lib/models/user/user';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
})
export class ProfileSettingsComponent implements OnInit {
  userProfile: User;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}
}
