import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Cp } from '../models/content/cp';
import { Observable, map } from 'rxjs';
import { Course } from '../models/content/course';

@Injectable({
  providedIn: 'root',
})
export class CareerPathService {
  private _careerPathCollection = 'career-path';
  constructor(private crudService: CrudService) {}

  // Career Path Collection

  getAllCareerPaths(): Observable<Cp[]> {
    return this.crudService.getData(this._careerPathCollection).pipe(
      map((docSnaps) => {
        return docSnaps.map((docSnap) => {
          return <Cp>{
            id: docSnap.payload.doc.id,
            ...(docSnap.payload.doc.data() as object),
          };
        });
      })
    );
  }

  async addNewCareerPath(title: string, description: string) {
    return new Promise((resolve, reject) => {
      this.crudService
        .addData(this._careerPathCollection, {
          title,
          description,
        })
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }

  async addCourseToCareerPath(course: Course, careerPathID: string) {
    return new Promise((resolve, reject) => {
      this.crudService
        .setSingleDoc(
          `${this._careerPathCollection}/${careerPathID}/courses`,
          course.id,
          course
        )
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }

  async updateCareerPath(ID: any, title: string, description: string) {
    return new Promise((resolve, reject) => {
      this.crudService
        .updateData(this._careerPathCollection, ID, {
          title,
          description,
        })
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }

  async deleteCareerPath(cpID: string) {
    return new Promise((resolve, reject) => {
      this.crudService
        .deleteData(this._careerPathCollection, cpID)
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }

  // Courses SubCollection

  getAllCareerCourses(careerID: string) {
    return this.crudService
      .getData(`/${this._careerPathCollection}/${careerID}/courses`)
      .pipe(
        map((careerDocSnaps) => {
          return careerDocSnaps.map((careerDoc) => {
            return <Course>{
              id: careerDoc.payload.doc.id,
              ...(careerDoc.payload.doc.data() as object),
            };
          });
        })
      );
  }
}
