import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Data } from '@angular/router';
import { AuthService, User } from 'DAL';
import * as moment from 'moment-timezone';
import { tap } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userDoc = <User>{};
  flag: string;
  isActiveUserProfile = false;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    //Check if this the active user is reaching their profile!
    this.authService.user.subscribe((user) => {
      if (user.uid === this.route.snapshot.paramMap.get('uid')) {
        this.isActiveUserProfile = true;
      }
    });
    //Get user data from resolver!
    this.route.data.subscribe((data: Data) => {
      this.userDoc = data['userData'];
      console.log(this.userDoc);
      this.titleService.setTitle(this.userDoc.displayName);
      this.flag = `https://flagcdn.com/${this.userDoc?.countryCode?.toLowerCase()}.svg`;
    });
  }
}
