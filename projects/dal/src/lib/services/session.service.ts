import { Injectable } from '@angular/core';
import { Mentor, sessionForm, WeekDays } from '../models/mentor/mentor';
import { CrudService } from './crud.service';

// import moment time zone
import * as moment from 'moment-timezone';
import { map } from 'rxjs';
import { Session } from '../models/session/session';
import { BookedSession } from '../../public-api';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private _mentorsCollection = 'mentors';
  private _bookedSessionsCollection = 'booked-sessions';

  constructor(private _crud: CrudService) {
    // get time zone from moment

    // moment.tz.setDefault('Africa/Cairo');

    // console.log(' current time zone: ', moment.tz.guess());

    // const time = '20:00';

    // let day = new Date();
    // day.setDate(day.getDate() + ((0 + (7 - day.getDay())) % 7));
    // day.setHours(+time.split(':')[0]);
    // day.setMinutes(+time.split(':')[1]);
    // day.setSeconds(0);

    // if (day.getDate() === new Date().getDate()) {
    //   day.setDate(day.getDate() + 7);
    // }

    // // get current time and time zone
    // var a = moment.tz("2024-06-13 11:55", "Africa/Cairo");

    // // get time zone from moment
    // console.log(" current time zone: ", a.format());

    // // get qatar time of the same time
    // var b = a.clone().tz("Asia/Qatar");
    // console.log(" qatar time zone: ", b.format());

    // // get malaysia time of the same time
    // var c = a.clone().tz("Asia/Kuala_Lumpur");
    // console.log(" malaysia time zone: ", c.format());

    // // get london time of the same time
    // var d = a.clone().tz("Europe/London");
    // console.log(" london time zone: ", d.format());

    // // get new york time of the same time
    // var e = a.clone().tz("America/New_York");
    // console.log(" new york time zone: ", e.format());
  }

  getDate() {
    return this._crud.getAllData('_date').pipe(
      map((doc) => {
        return doc.docs.map((date) => {
          return date.data();
        });
      })
    );
  }

  getAllSessions() {
    return this._crud.getDataByOrder('sessions', 'index').pipe(
      map((rawData) => {
        return rawData.map((doc) => {
          return <Session>{
            id: doc.payload.doc.id,
            ...(doc.payload.doc.data() as object),
          };
        });
      })
    );
  }

  bookSession(session: BookedSession) {
    return new Promise((resolve, reject) => {
      this._crud.addData(this._bookedSessionsCollection, session)
      .then((res) => resolve(res))
      .catch((error) => reject(error));
    });

  }
}
