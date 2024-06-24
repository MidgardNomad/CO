import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  week: string[] = [];
  streakDay: string[] = [];

  constructor() {}

  ngOnInit(): void {
    let curr = new Date();
    for (let i = 1; i <= 7; i++) {
      let first = curr.getDate() - curr.getDay() + i;
      let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
      this.week.push(day);
    }
    this.streakDay.push(this.week[0]);
  }
}
