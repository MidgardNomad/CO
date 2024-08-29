import { Observable, map } from 'rxjs';
import { CrudService } from './crud.service';
import { User } from '../models/user/user';
import { CourseLevel } from '../models/user/courseLevel';
import { Course } from '../models/content/course';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BookedSession } from '../models/session/bookedSession';
import { UserProject } from '../models/user/userProject';
import { ConnectedAccounts } from '../models/user/connectedAccounts';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _usersCollection = 'users';
  private _coursesCollection = 'courses';
  private _bookedSessionsCollection = 'booked-sessions';
  private _projectsCollection = 'projects';

  userDoc: Observable<User> | null;

  constructor(
    private crudService: CrudService,
    private authService: AuthService
  ) {}

  async createUserDoc(newUser: any, country: string, countryCode: string) {
    return new Promise((resolve, reject) => {
      this.crudService
        .setSingleDoc('users', newUser.user.uid, {
          id: newUser.user.uid,
          email: newUser.user.email,
          displayName: newUser.user.displayName,
          photoURL: newUser.user.photoURL,
          isVerified: false,
          isPro: false,
          active: false,
          lastLogin: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
          maxStreak: 0,
          currentStreak: 0,
          streakDays: [],
          deletedAt: null,
          deleted: false,
          courseList: [],
          linkedIn: '',
          gitHub: '',
          bio: '',
          countryCode,
          country,
          paid: false,
          sessionExpirationDate: null,
          // availableSessions: null,
        } as User)
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }

  getUser() {
    this.authService.user.subscribe((userAuthObj) => {
      if (userAuthObj == null) {
        this.userDoc = null;
      } else {
        this.userDoc = this.getActiveUser(userAuthObj.uid);
      }
    });
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

  getActiveUser(userID: string) {
    return this.crudService
      .getSignleDocSnap(this._usersCollection, userID)
      .pipe(
        map((userDocSnap) => {
          return <User>{
            id: userDocSnap.payload.id,
            ...(userDocSnap.payload.data() as object),
          };
        })
      );
  }

  getSingleUser(userID: string) {
    return this.crudService.getSignleDoc(this._usersCollection, userID).pipe(
      map((userDocSnap) => {
        console.log('userDocSnap', userDocSnap);

        return <User>{
          id: userDocSnap.id,
          isExist: userDocSnap.exists,
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
  async enrollInCourse(userID: string, courseID: string, data: Course) {
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

  async addCourseLevelToUserDoc(userID: string, courseLevel: CourseLevel[]) {
    return new Promise((resolve, reject) => {
      this.crudService
        .updateData('users', userID, { courseList: courseLevel })
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }

  async updateUserStearkDays(
    userID: string,
    streakDays: Date[],
    maxStreak: number,
    currentStreak: number
  ) {
    return new Promise((resolve, reject) => {
      this.crudService
        .updateData('users', userID, {
          streakDays,
          maxStreak,
          currentStreak,
        })
        .then(resolve)
        .catch(reject);
    });
  }

  async updateUserDoc(user: User) {
    return new Promise((resolve, reject) => {
      this.crudService
        .updateData('users', user.id, user)
        .then(resolve)
        .catch(reject);
    });
  }

  async TareCurrentStreak(userID: string) {
    return new Promise((resolve, reject) => {
      this.crudService
        .updateData('users', userID, { currentStreak: 0 })
        .then(resolve)
        .catch(reject);
    });
  }
  //Books Sessions:
  async bookSession(session: BookedSession) {
    return new Promise((resolve, reject) => {
      this.crudService
        .addData(this._bookedSessionsCollection, session)
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }
  //Projects

  getUserProjects(userID: string) {
    return this.crudService
      .getData(
        `/${this._usersCollection}/${userID}/${this._projectsCollection}`
      )
      .pipe(
        map((userProjectsDocs) => {
          return userProjectsDocs.map((project) => {
            return <UserProject>{
              id: project.payload.doc.id,
              ...(project.payload.doc.data() as object),
            };
          });
        })
      );
  }

  async submitProject(userID: string, project: UserProject) {
    return new Promise((resolve, reject) => {
      this.crudService
        .addData(
          `${this._usersCollection}/${userID}/${this._projectsCollection}`,
          project
        )
        .then(resolve)
        .catch(reject);
    });
  }
  //user setttings
  async addUserSocials(userID: string, socials: any) {
    return new Promise((resolve, reject) => {
      this.crudService
        .updateData(this._usersCollection, userID, socials)
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }
}
