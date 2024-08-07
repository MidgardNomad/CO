import { Component, Input, OnInit } from '@angular/core';
import { BookedSession, SessionService, Session, AuthService, User, MentorService, Mentor } from 'DAL';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-session-card',
  templateUrl: './session-card.component.html',
  styleUrls: ['./session-card.component.scss'],
})
export class SessionCardComponent implements OnInit {
  @Input() session: Session;
  @Input() dayNumber: number;
  day=new Date();
  userTimeZone:string;
  user;

  dates;
  constructor(private sessionService: SessionService,private auth:AuthService,private mentorService:MentorService) {}

  ngOnInit(): void {
    this.sessionService.getDate().subscribe((dates) => {
      this.dates = dates;
    });

    this.auth.user.subscribe(res=>this.user=res)
    this.getUserTimeZone();
  }

  getTimeAndDate(time: string, dow: number) {
    this.day = new Date();
    this.day.setDate(this.day.getDate() + ((dow + (7 - this.day.getDay())) % 7));


    let userTime=this.convertTime(time,'Africa/Cairo',this.userTimeZone);

    this.day.setHours(+userTime.split(':')[0]);
    this.day.setMinutes(+userTime.split(':')[1]);
    this.day.setSeconds(0);

    if (this.day.getDate() === new Date().getDate()) {
      this.day.setDate(this.day.getDate() + 7);
    }
    // const timestamp = moment(day);

    // console.log(momenttz(timestamp).tz(momenttz.tz.guess()).format());

    // console.log(moment(day.toISOString()).tz(moment.tz.guess()).format())+++++++++++++++++++++++++++++++++++;
    
    return this.day;
  }

  async bookSession(session: Session) {
    console.log('this.day',session);

    const mentorID=await this.getSessionMentor(this.session.day);
    console.log(mentorID);
    
    const bookedSession: BookedSession = {} as BookedSession;
    bookedSession.mentorId=mentorID as string,
    bookedSession.sessionDate=`${this.day.getMonth()+1}-${this.day.getDate()}-${this.day.getFullYear()}`,
    bookedSession.sessionDuration=session.duration,
    bookedSession.sessionId=session.id,
    bookedSession.sessionStatus='pending',
    bookedSession.sessionTime=session.time,
    bookedSession.sessionType=session.title,
    bookedSession.userId=this.user.uid,
    bookedSession.sessionDay=this.session.day

    console.log(bookedSession);

    this.sessionService.bookSession(bookedSession).then(res=>{
      console.log('added session success',res);
      alert('success book')
    }).catch(err=>{
      console.log('err');
    })
    
  }

  getSessionMentor(sessionDay:string){
    return new Promise((resolve,reject)=>{
      this.mentorService.getMenorBySessionID(sessionDay).subscribe(res=>{
        console.log('mentor',res[0]);
        resolve(res[0].id)
      })
    })
  }

  convertTime(time:string,sessionTZ:string,userTZ:string){

    const cairoTime = moment.tz(time, 'HH:mm', sessionTZ);

    // Convert to user Time (ET)
    const easternTime = cairoTime.clone().tz(userTZ);

    return easternTime.format('HH:mm');

  }

  getUserTimeZone(): void {
    this.userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log('User Time Zone:', this.userTimeZone);
  }
}
