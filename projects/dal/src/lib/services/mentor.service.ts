import { Injectable } from '@angular/core';
import { Mentor, sessionForm, WeekDays } from '../models/mentor/mentor';
import { CrudService } from './crud.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MentorService {
  private _mentorsCollection = 'mentors';
  private _sessionsCollection = 'sessions';
  private _bookedSessions = 'booked-sessions';

  constructor(private _crud: CrudService) {}

  getMentors() {
    return this._crud.getAllData(this._mentorsCollection).pipe(
      map((mentorsList) => {
        return mentorsList.docs.map((mentorDoc) => {
          return <Mentor>{
            id: mentorDoc.id,
            ...(mentorDoc.data() as object),
          };
        });
      })
    );
  }

  getMentorByID(mentorID: string) {
    return this._crud.getSingleData(this._mentorsCollection, mentorID).pipe(
      map((mentorFBDoc) => {
        return <Mentor>{
          id: mentorFBDoc.id,
          ...(mentorFBDoc.data() as object),
        };
      })
    );
  }

  addMentor(mentor: Mentor) {
    return new Promise((resolve, reject) => {
      this._crud
        .addData(this._mentorsCollection, mentor)
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }

  updateMentor(mentorID: string, mentor: Mentor) {
    return this._crud.updateData(this._mentorsCollection, mentorID, mentor);
  }

  deleteMentor(mentorID: string) {
    return this._crud.deleteData(this._mentorsCollection, mentorID);
  }

  getMentorSessions(mentorID: string) {
    return this._crud.getDataByOneField(
      this._bookedSessions,
      'mentorId',
      mentorID
    );
  }

  addToSessionSchedule(mentorID: string, session: sessionForm[]) {
    return new Promise((resolve, reject) => {
      this._crud
        .updateData(this._mentorsCollection, mentorID, {
          weeklySchedule: session,
        })
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }

  getMenorBySessionID(sessionID:string){
    return this._crud.getSingleDocByField(this._mentorsCollection,'freeDay',sessionID).pipe(map(data=>
      data.docs.map((res:any)=>{
        return {...res.data(),id:res.id}
      })
    ))
  }

  getAllStudentReservedSession(day:string,date:string){
    return this._crud.getDocByTwoField(this._bookedSessions,'sessionDay',day,'sessionDate',date);
  }
  // Edit Image For Profile Mentor
  updateMentorProfilePicture(mentorID: string, profilePicture: string) {
    return this._crud.updateData(this._mentorsCollection, mentorID, {
      profilePicture,
    });
  }
}
