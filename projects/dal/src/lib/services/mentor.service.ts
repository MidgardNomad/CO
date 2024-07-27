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
    return this._crud.getSingleData(this._mentorsCollection, mentorID);
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
    return this._crud.getSingleDataByField(
      this._sessionsCollection,
      'mentorId',
      mentorID
    );
  }

  addToSessionSchedule(mentorID: string, session: sessionForm) {
    return this._crud.addData(this._mentorsCollection, session);
  }
}
