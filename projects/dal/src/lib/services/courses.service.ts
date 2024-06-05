import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Course } from '../models/content/course';
import { Chapter } from '../models/content/chapter';
import { Lecture } from '../models/content/lecture';
import { Ss } from '../models/content/ss';
import { Observable, map, pipe, retry, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private _coursesCollection = 'courses';
  private _chaptersCollection = 'chapters';
  private _lecturesCollection = 'lectures';
  private _slidesCollection = 'slides';
  constructor(private crudSerive: CrudService) {}

  //Courses Methods:
  getAllCourses(): Observable<Course[]> {
    return this.crudSerive.getData(this._coursesCollection).pipe(
      map((docSnapShots) => {
        return docSnapShots.map((docSnap) => {
          return <Course>{
            id: docSnap.payload.doc.id,
            ...(docSnap.payload.doc.data() as object),
          };
        });
      })
    );
  }

  async createNewCourse(courseTitle: string, courseDescription: string) {
    return new Promise((resolve, reject) => {
      this.crudSerive
        .addData(this._coursesCollection, {
          title: courseTitle,
          description: courseDescription,
        } as Course)
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }

  async editCourse(courseID: string, data: any) {
    return new Promise((resolve, reject) => {
      this.crudSerive
        .updateData(this._coursesCollection, courseID, data)
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }

  async deleteCourse(courseID: string) {
    return new Promise((resolve, reject) => {
      this.crudSerive
        .deleteData(this._coursesCollection, courseID)
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }

  //---------------------------------------------------------------------
  //Chapters Methods:
  //---------------------------------------------------------------------
  getChapters(courseID: string): Observable<Chapter[]> {
    return this.crudSerive
      .getDataByOrder(
        `/${this._coursesCollection}/${courseID}/${this._chaptersCollection}`,
        'seqNo'
      )
      .pipe(
        map((docSnaps) => {
          return docSnaps.map((snap) => {
            return <Chapter>{
              id: snap.payload.doc.id,
              ...(snap.payload.doc.data() as object),
            };
          });
        })
      );
  }

  async createNewCourseChapter(
    courseID: string,
    data: { title: string; description: string; seqNo: number }
  ) {
    return new Promise((resolve, reject) => {
      this.crudSerive
        .addDataToSubCollection(
          `/${this._coursesCollection}/${courseID}/${this._chaptersCollection}`,
          data
        )
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }

  async editChapterDetails(courseID: string, chapterID: string, data: any) {
    return new Promise((resolve, reject) => {
      this.crudSerive
        .updateData(
          `/${this._coursesCollection}/${courseID}/${this._chaptersCollection}`,
          chapterID,
          data
        )
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }

  async deleteChapter(courseID: string, chapterID: string) {
    return new Promise((resolve, reject) => {
      this.crudSerive
        .deleteData(
          `/${this._coursesCollection}/${courseID}/${this._chaptersCollection}`,
          chapterID
        )
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }

  //---------------------------------------------------------------------
  //Lectures Methods:
  //---------------------------------------------------------------------
  getAllLectures(courseID: string, chapterID: string): Observable<Lecture[]> {
    return this.crudSerive
      .getDataByOrder(
        `/${this._coursesCollection}/${courseID}/${this._chaptersCollection}/${chapterID}/${this._lecturesCollection}`,
        'seqNo'
      )
      .pipe(
        map((docSnaps) => {
          return docSnaps.map((doc) => {
            return <Lecture>{
              id: doc.payload.doc.id,
              ...(doc.payload.doc.data() as Object),
            };
          });
        })
      );
  }

  async addNewLecture(
    courseID: string,
    chapterID: string,
    data: { title: string; seqNo: number }
  ) {
    return new Promise((resolve, reject) => {
      this.crudSerive
        .addDataToSubCollection(
          `/${this._coursesCollection}/${courseID}/${this._chaptersCollection}/${chapterID}/${this._lecturesCollection}`,
          data
        )
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }

  async editLectureDetails(
    courseID: string,
    chapterID: string,
    lectureID: string,
    data: any
  ) {
    return new Promise((resolve, reject) => {
      this.crudSerive
        .updateData(
          `/${this._coursesCollection}/${courseID}/${this._chaptersCollection}/${chapterID}/${this._lecturesCollection}`,
          lectureID,
          data
        )
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }
  async deleteLecture(courseID: string, chapterID: string, lectureID: string) {
    return new Promise((resolve, reject) => {
      this.crudSerive
        .deleteData(
          `/${this._coursesCollection}/${courseID}/${this._chaptersCollection}/${chapterID}/${this._lecturesCollection}`,
          lectureID
        )
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }

  //Slides Methods:
  getAllSlides(
    courseID: string,
    chapterID: string,
    lectureID: string
  ): Observable<Ss[]> {
    return this.crudSerive
      .getDataByOrder(
        `/${this._coursesCollection}/${courseID}/${this._chaptersCollection}/${chapterID}/${this._lecturesCollection}/${lectureID}/${this._slidesCollection}`,
        'seqNo'
      )
      .pipe(
        map((docSnaps) => {
          return docSnaps.map((docSnap) => {
            return <Ss>{
              id: docSnap.payload.doc.id,
              ...(docSnap.payload.doc.data() as object),
            };
          });
        })
      );
  }

  async addSlide(
    courseID: string,
    chapterID: string,
    lectureID: string,
    data: Ss
  ) {
    return new Promise((resolve, reject) => {
      this.crudSerive
        .addDataToSubCollection(
          `/${this._coursesCollection}/${courseID}/${this._chaptersCollection}/${chapterID}/${this._lecturesCollection}/${lectureID}/${this._slidesCollection}`,
          data
        )
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }

  async editSlide(
    courseID: string,
    chapterID: string,
    lectureID: string,
    slideID: string,
    data: any
  ) {
    return new Promise((resolve, reject) => {
      this.crudSerive
        .updateData(
          `/${this._coursesCollection}/${courseID}/${this._chaptersCollection}/${chapterID}/${this._lecturesCollection}/${lectureID}/${this._slidesCollection}`,
          slideID,
          data
        )
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }

  async deleteSlide(
    courseID: string,
    chapterID: string,
    lectureID: string,
    slideID: string
  ) {
    return new Promise((resolve, reject) => {
      this.crudSerive
        .deleteData(
          `/${this._coursesCollection}/${courseID}/${this._chaptersCollection}/${chapterID}/${this._lecturesCollection}/${lectureID}/${this._slidesCollection}`,
          slideID
        )
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }
}
