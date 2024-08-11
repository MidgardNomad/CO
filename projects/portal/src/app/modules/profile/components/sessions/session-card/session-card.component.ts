import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookedSession, SessionService, Session, AuthService, User, MentorService, Mentor } from 'DAL';
import * as moment from 'moment-timezone';
export enum disabledReson {
  notHaveMentor = 'Not Have Mentor',
  completed = 'Completed',
}
@Component({
  selector: 'app-session-card',
  templateUrl: './session-card.component.html',
  styleUrls: ['./session-card.component.scss'],
})
export class SessionCardComponent implements OnInit {
  @Input() session: Session;
  @Input() dayNumber: number;
  day = new Date();
  userTimeZone: string;
  user;
  mentor;

  userCollection: User;

  progressiveCheckAccessability: boolean = true;

  sessionDisabled: boolean = false;
  userCanCancelSession: boolean = false;
  sessionPending: boolean = false;

  sessionDisabledReason: string = ''

  constructor(
    private sessionService: SessionService,
    private auth: AuthService,
    private mentorService: MentorService,
    private activateRoute: ActivatedRoute
  ) { }

  async ngOnInit() {    
    this.getDataFromResolver();
    this.auth.user.subscribe(res => this.user = res)
    this.mentor = await this.getSessionMentor(this.session.day);
    this.getUserTimeZone();
    this.getTimeAndDate(this.session.time, this.dayNumber - 1);
    this.checkSessionAvailability(this.session);
  }

  getDataFromResolver() {
    this.activateRoute.data.subscribe(res => {
      this.userCollection = res['userData'];
    })
  }

  getTimeAndDate(time: string, dow: number) {
    console.log(1);

    this.day = new Date();
    this.day.setDate(this.day.getDate() + ((dow + (7 - this.day.getDay())) % 7));


    let userTime = this.convertTime(time, this.mentor?.timeZone || "Africa/Cairo", this.userTimeZone);

    this.day.setHours(+userTime.split(':')[0]);
    this.day.setMinutes(+userTime.split(':')[1]);
    this.day.setSeconds(0);

    if (this.day.getDate() === new Date().getDate()) {
      this.day.setDate(this.day.getDate() + 7);
    }

    return this.day;
  }

  async bookSession(session: Session) {

    // if (this.sessionDisabled) {
    //   return false;
    // }

    console.log('this.day', session);


    const bookedSession: BookedSession = {} as BookedSession;
    bookedSession.mentorId = this.mentor.id as string,
      bookedSession.sessionDate = `${this.day.getMonth() + 1}-${this.day.getDate()}-${this.day.getFullYear()}`,
      bookedSession.sessionDuration = session.duration,
      bookedSession.sessionId = session.id,
      bookedSession.sessionStatus = 'pending',
      bookedSession.sessionTime = session.time,
      bookedSession.sessionType = session.title,
      bookedSession.userId = this.user.uid,
      bookedSession.sessionDay = this.session.day

    console.log(bookedSession);

    this.sessionService.bookSession(bookedSession).then(res => {
      console.log('added session success', res);
      alert('success book');
      this.sessionDisabled=true;
      const check=this.checkCanICancelSession();
      console.log(check);
      
      if (check) {
        this.userCanCancelSession=true;
        this.sessionDisabled=false;
        this.sessionPending=false;
      }else{
        this.userCanCancelSession=false;
        this.sessionPending=true;
        this.sessionDisabled=true;
      }
    }).catch(err => {
      console.log('err');
    })

  }

  getSessionMentor(sessionDay: string) {
    return new Promise((resolve, reject) => {
      this.mentorService.getMenorBySessionID(sessionDay).subscribe(res => {
        resolve(res[0])
      })
    })
  }

  convertTime(time: string, sessionTZ: string, userTZ: string) {

    const cairoTime = moment.tz(time, 'HH:mm', sessionTZ);

    // Convert to user Time (ET)
    const easternTime = cairoTime.clone().tz(userTZ);

    return easternTime.format('HH:mm');

  }

  getUserTimeZone(): void {
    this.userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log('User Time Zone:', this.userTimeZone);
  }

  checkSessionAvailability(session: Session) {

    let skipFirstLayer = false;
    if (session.id === 'onboarding') {
      skipFirstLayer = true
    }

    this.progressiveCheckAccessability = true;
    if (!skipFirstLayer) {
      this.progressiveCheckAccessability = this.checkUserProgress(session);
      if (this.progressiveCheckAccessability) {
        //first check of mentor id
        if (this.mentor?.id) {
          const date = `${this.day.getMonth() + 1}-${this.day.getDate()}-${this.day.getFullYear()}`;

          this.mentorService.getAllStudentReservedSession(this.mentor.freeDay, date).subscribe(res => {
            console.log('studnet reserved session', res);

            //second check of user alredy booked this session before
            let index = res.findIndex(ele => ele.userId === this.user.uid);
            console.log(index);

            if (index >= 0) {
              this.sessionDisabled = true;
              const check = this.checkCanICancelSession();
              console.log(check);
              if (check) {
                this.userCanCancelSession = true;
                this.sessionDisabled = false;
              } else {
                this.userCanCancelSession = false;
                this.sessionPending = true;
              }
              console.log(this.userCanCancelSession);

              return;
            }

            //third check of session have 10 user
            if (res.length >= 10) {
              this.sessionDisabled = true;
              this.sessionDisabledReason = disabledReson.completed;
              return;
            }

          })

          // this.sessionDisabled=false;
        } else {
          this.sessionDisabled = true;
          this.sessionDisabledReason = disabledReson.notHaveMentor;
          return;
        }
      }else{
        this.sessionDisabled=true;
      }
      return;
    } else {
      console.log('skip',session.id);
      
      //first check of mentor id
      if (this.mentor?.id) {
        const date = `${this.day.getMonth() + 1}-${this.day.getDate()}-${this.day.getFullYear()}`;
        console.log('date',date);
        console.log(this.mentor.freeDay);
        
        this.mentorService.getAllStudentReservedSession(this.mentor.freeDay, date).subscribe(res => {
          console.log('studnet reserved session', res);

          if (res?.length > 0) {
            //second check of user alredy booked this session before
            let index = res.findIndex(ele => ele.userId === this.user.uid);
            console.log(index);

            if (index >= 0) {
              this.sessionDisabled = true;
              const check = this.checkCanICancelSession();
              console.log(check);
              if (check) {
                this.userCanCancelSession = true;
                this.sessionDisabled = false;
              } else {
                this.userCanCancelSession = false;
                this.sessionPending = true;
              }
              console.log(this.userCanCancelSession);

              return;
            } else {
              this.sessionDisabled = true;
              this.sessionDisabledReason = disabledReson.completed;
            }

          } else {
            this.sessionDisabled=false;
          }

        })

      } else {
        this.sessionDisabled = true;
        this.sessionDisabledReason = disabledReson.notHaveMentor;
        return;
      }
    }



  }

  checkUserProgress(session: Session): boolean {
    if (this.userCollection.courseList.length===1) {
      if (session.id === 'html' ) {
        if (this.userCollection.courseList[0].finished !== null) {
          return true;
        }
      }
      return false;
    }else if(this.userCollection.courseList.length===2){
      if (session.id === 'html' ) {
        if (this.userCollection.courseList[0].finished !== null) {
          return true;
        }
      }
      if (session.id === 'css') {
        if (this.userCollection.courseList[1].finished !== null) {
          return true;
        }
      }
      return false;
    }else if(this.userCollection.courseList.length===3){
      if (session.id === 'html' ) {
        if (this.userCollection.courseList[0].finished !== null) {
          return true;
        }
      }
      if (session.id === 'css') {
        if (this.userCollection.courseList[1].finished !== null) {
          return true;
        }
      }
      if (session.id === 'js') {
        if (this.userCollection.courseList[2].finished !== null) {
          return true;
        }
      }
      return false;
    }
    return false;

  }

  cancelSession(session: Session) {
    const date = `${this.day.getMonth() + 1}-${this.day.getDate()}-${this.day.getFullYear()}`;
    this.sessionService.cancelSession(this.user.uid, this.mentor.id, date).then((res) => {
      console.log('cancel',res);
      this.sessionDisabled=false
      this.userCanCancelSession=false;
      alert('session deleted');
    }).catch((err) => {
      alert('an error');
      console.log('err', err);

    })
  }

  checkSession(session: Session) {
    if (!this.sessionDisabled && !this.userCanCancelSession) {
      this.bookSession(session);
    } else if (this.userCanCancelSession) {
      this.cancelSession(session);
    }
  }

  checkCanICancelSession(): boolean {
    const today = moment();
    const sessionDate = moment(this.day);
    if (sessionDate.subtract(24, 'hours').isAfter(today)) {
      return true; //can cancel session
    }
    return false; //can NOT cancel session
  }
}
