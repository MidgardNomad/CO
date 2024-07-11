import { Injectable } from '@angular/core';
import { Mentor, sessionForm, WeekDays } from '../models/mentor/mentor';
import { CrudService } from './crud.service';

// import moment time zone
import * as moment from 'moment-timezone';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private crudSerive: CrudService) {
    // get time zone from moment
    console.log(" current time zone: ", moment.tz.guess());

    // get current time and time zone
    var a = moment.tz("2024-06-13 11:55", "Africa/Cairo");

    // get time zone from moment
    console.log(" current time zone: ", a.format());

    // get qatar time of the same time
    var b = a.clone().tz("Asia/Qatar");
    console.log(" qatar time zone: ", b.format());

    // get malaysia time of the same time
    var c = a.clone().tz("Asia/Kuala_Lumpur");
    console.log(" malaysia time zone: ", c.format());

    // get london time of the same time
    var d = a.clone().tz("Europe/London");
    console.log(" london time zone: ", d.format());

    // get new york time of the same time
    var e = a.clone().tz("America/New_York");
    console.log(" new york time zone: ", e.format());

  }

  private _mentorsCollection = 'mentors';
  private _sessionsCollection = 'sessions';





}
