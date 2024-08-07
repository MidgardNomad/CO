import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Lecture } from '../models/content/lecture';
import { map } from 'rxjs';
import { Chapter } from '../models/content/chapter';

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
        `/${this._coursesCollection}/${courseID}/${this._chaptersCollection}/${chapterID}/${this._lecturesCollection}`,
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

  getFirstLectureIDOfChapter(courseId: string, chapterId: string) {
    return this.crudService
      .getSingleDataByField(
        `/${this._coursesCollection}/${courseId}/${this._chaptersCollection}/${chapterId}/${this._lecturesCollection}`,
        'seqNo',
        1
      )
      .pipe(
        map((lectureDocs) => {
          return lectureDocs.map((lectureDoc) => {
            return lectureDoc.payload.doc.id;
          });
        })
      );
  }

  //Chapters
  getSigleChapter(courseID: string, chapterID: string) {
    return this.crudService
      .getSingleData(
        `/${this._coursesCollection}/${courseID}/${this._chaptersCollection}/`,
        chapterID
      )
      .pipe(
        map((chapterDoc) => {
          return <Chapter>{
            id: chapterDoc.id,
            ...(chapterDoc.data() as object),
          };
        })
      );
  }

  getNextChapterID(courseID: string, seqNo: number) {
    return this.crudService
      .getSingleDocByField(`courses/${courseID}/chapters/`, 'seqNo', seqNo)
      .pipe(
        map((chapterDoc) => {
          if (chapterDoc.docs[0]?.exists) {
            console.log('I do not exist!');
            return chapterDoc.docs[0].id;
          } else {
            return null;
          }
        })
      );
  }
}
