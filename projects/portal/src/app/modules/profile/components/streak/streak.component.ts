import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-streak',
  templateUrl: './streak.component.html',
  styleUrls: ['./streak.component.scss'],
})
export class StreakComponent implements OnInit {
  week: string[] = [];
  activeDays: string[];
  @Input() streakDays: Date[];
  @Input() currentStreak: number;
  @Input() maxStreak: number;
  td = new Date();

  //Utilities:
  //===================
  private convertTimestampToJSDateObj(timestamp): string {
    let date: Date = timestamp.toDate();
    date = new Date(date.setDate(date.getDate() + 1));
    return date.toISOString().slice(0, 10);
  }
  //===================
  ngOnInit(): void {
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      let offsetDay = today.getDate() - today.getDay() + i;
      let day = new Date(today.setDate(offsetDay)).toISOString().slice(0, 10);
      this.week.push(day);
    }
    this.activeDays = this.streakDays.map((day) =>
      this.convertTimestampToJSDateObj(day)
    );
  }
}
