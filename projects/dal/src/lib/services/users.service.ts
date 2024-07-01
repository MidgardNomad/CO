import { map, tap } from 'rxjs';
import { CrudService } from './crud.service';
import { User } from '../models/user/user';
import { Course } from '../models/content/course';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _usersCollection = 'users';
  private _coursesCollection = 'courses';
  userID: string;
  constructor(
    private crudService: CrudService,
    private authService: AuthService
  ) {}

  getUserID() {
    return this.authService.user.pipe(
      map((userData) => {
        return userData.uid;
      })
    );
  }

  getAllUsers() {
    return this.crudService.getData(this._usersCollection).pipe(
      map((docSnaps) => {
        return docSnaps.map((docSnap) => {
          return {
            id: docSnap.payload.doc.id,
            ...(docSnap.payload.doc.data() as object),
          } as User;
        });
      })
    );
  }

  getSingleUser(userID: string) {
    return this.crudService.getSignleDoc(this._usersCollection, userID).pipe(
      map((userDocSnap) => {
        return <User>{
          id: userDocSnap.id,
          ...(userDocSnap.data() as object),
        };
      })
    );
  }
  // get data coursrs
  getUserCourses(userID: string) {
    return this.crudService
      .getSubCollectionData(
        `/${this._usersCollection}/${userID}/${this._coursesCollection}`
      )
      .pipe(
        map((courseDocSanps) => {
          return courseDocSanps.docs.map((courseDocSnap) => {
            return <Course>{
              id: courseDocSnap.id,
              ...(courseDocSnap.data() as object),
            };
          });
        })
      );
  }

  //Enroll User in Course
  enrollInCourse(userID: string, courseID: string, data: Course) {
    return new Promise((resolve, reject) => {
      this.crudService
        .setSingleDoc(
          `${this._usersCollection}/${userID}/${this._coursesCollection}`,
          courseID,
          data
        )
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }
}
