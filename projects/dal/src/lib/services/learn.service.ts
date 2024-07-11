import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Lecture } from '../models/content/lecture';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LearnService {
  constructor(private crudService: CrudService) {}

  private _coursesCollection = 'courses';
  private _chaptersCollection = 'chapters';
  private _lecturesCollection = 'lectures';

  getSingleLectureByID(courseID: string, chapterID: string, lectureId: string) {
    return this.crudService
      .getSingleData(
        `/${this._coursesCollection}/${courseID}/${this._chaptersCollection}/${chapterID}/${this._lecturesCollection}`,
        lectureId
      )
      .pipe(
        map((docSnap) => {
          return <Lecture>{
            id: docSnap.id,
            ...(docSnap.data() as object),
          };
        })
      );
  }

  getNextLectureID(courseID: string, chapterID: string, seqNo: number) {
    return this.crudService
      .getSingleDocByField(
        `/courses/${courseID}/chapters/${chapterID}/lectures`,
        'seqNo',
        seqNo
      )
      .pipe(
        map((lectures) => {
          return lectures.docs.map((lecture) => {
            return lecture.id;
          });
        })
      );
  }
}
