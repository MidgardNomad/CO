import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Data } from '@angular/router';
import { User } from 'DAL';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userDoc = <User>{};
  flag: string;

  constructor(private route: ActivatedRoute, private titleService: Title) {}

  ngOnInit(): void {
    //Get user data from resolver!
    this.route.data.subscribe((data: Data) => {
      this.userDoc = data['userData'];
      this.titleService.setTitle(this.userDoc.displayName);
      this.flag = `https://flagcdn.com/${this.userDoc?.countryCode?.toLowerCase()}.svg`;
    });
  }
}
