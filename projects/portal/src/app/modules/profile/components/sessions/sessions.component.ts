import { Component, OnInit } from '@angular/core';
import { Session, SessionService } from 'DAL';
import { duration } from 'moment';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss'],
})
export class SessionsComponent implements OnInit {
  sessions: Session[] = [];

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    this.sessionService
      .getAllSessions()
      .subscribe((dbSessions) => (this.sessions = dbSessions));

    // this.sessionService.getDate().subscribe((dates) => {
    //   console.log(new Date((dates[0] as any).date.seconds * 1000));
    // });
  }
}
