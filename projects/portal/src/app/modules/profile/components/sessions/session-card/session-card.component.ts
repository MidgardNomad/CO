import { Component, Input, OnInit } from '@angular/core';
import { BookedSession, SessionService, Session } from 'DAL';
import * as momenttz from 'moment-timezone';
import * as moment from 'moment';

@Component({
  selector: 'app-session-card',
  templateUrl: './session-card.component.html',
  styleUrls: ['./session-card.component.scss'],
})
export class SessionCardComponent implements OnInit {
  @Input() session: Session;
  @Input() dayNumber: number;

  dates;
  constructor(private sessionService: SessionService) {}

  getTimeAndDate(time: string, dow: number) {
    let day = new Date();
    day.setDate(day.getDate() + ((dow + (7 - day.getDay())) % 7));


    let userTime=this.convertTime(time,'Africa/Cairo','America/Denver');

    day.setHours(+userTime.split(':')[0]);
    day.setMinutes(+userTime.split(':')[1]);
    day.setSeconds(0);

    if (day.getDate() === new Date().getDate()) {
      day.setDate(day.getDate() + 7);
    }
    // const timestamp = moment(day);

    // console.log(momenttz(timestamp).tz(momenttz.tz.guess()).format());

    // console.log(moment(day.toISOString()).tz(moment.tz.guess()).format())+++++++++++++++++++++++++++++++++++;

    return day;
  }

  ngOnInit(): void {
    this.sessionService.getDate().subscribe((dates) => {
      this.dates = dates;
    });
    this.getUserTimeZone();
  }

  bookSession(session: Session) {
    const bookedSession: BookedSession = {} as BookedSession;
  }

  convertTime(time:string,sessionTZ:string,userTZ:string){

    const cairoTime = moment.tz(time, 'HH:mm', sessionTZ);

    // Convert to user Time (ET)
    const easternTime = cairoTime.clone().tz(userTZ);

    return easternTime.format('HH:mm');

  }

  getUserTimeZone(): void {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log('User Time Zone:', userTimeZone);
  }
}
