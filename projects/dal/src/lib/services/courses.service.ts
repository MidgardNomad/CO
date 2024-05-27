import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Course } from '../models/content/course';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private _coursesCollection = 'courses';
  constructor(private crudSerive: CrudService) {}

  //Methods:
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

  getSingleCourse(courseID) {}

  async createNewCourse(courseTitle: string, courseDescription: string) {
    return new Promise((resolve, reject) => {
      this.crudSerive
        .addData(this._coursesCollection, {
          title: courseTitle,
          description: courseDescription,
          chapterList: [],
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
}
