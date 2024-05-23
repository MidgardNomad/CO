import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router, UrlTree } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  catchError,
  from,
  map,
  tap,
  throwError,
} from 'rxjs';
import { User } from '../models/user/user';
import { CrudService } from './crud.service';
import { UserService } from './user.service';
import { DocumentReference } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //Class Properties
  currentUser = new BehaviorSubject<User>(null);
  user = this.auth.user;

  constructor(
    private auth: AngularFireAuth,
    private crudService: CrudService,
    private router: Router
  ) {}

  //Class Getters

  //Class Setters

  //Class Utilities
  handleErrors(err: firebase.default.FirebaseError) {
    let errMessage = 'Something Went Wrong! Please, Try Again.';
    if (!err || !err.code) {
      return throwError(() => new Error(errMessage));
    }
    switch (err.code) {
      case 'auth/invalid-login-credentials':
        errMessage = 'Invalid Credentials';
        break;
      case 'auth/network-request-failed':
        errMessage =
          'Something Went Wrong! Please, Check Your Internet Connection';
        break;
      default:
        errMessage = 'Invalid Email';
        break;
    }
    return throwError(() => new Error(errMessage));
  }

  //Class Methods
  login(
    email: string,
    password: string,
    stayLoggedIn: boolean | ''
  ): Observable<firebase.default.auth.UserCredential> {
    this.auth.setPersistence(stayLoggedIn ? 'local' : 'session').then();
    return from(
      this.auth.signInWithEmailAndPassword(email, password).then((res) => {
        this.router.navigate(['/profile', res.user.uid]);
        return res;
      })
    ).pipe(catchError(this.handleErrors));
  }

  signUp(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Observable<firebase.default.auth.UserCredential> {
    return from(
      this.auth.createUserWithEmailAndPassword(email, password).then((res) => {
        res.user
          .updateProfile({
            displayName: `${firstName} ${lastName}`,
            photoURL: '../../../../../assets/images/SignupArt.svg',
          })
          .then(() => {
            this.crudService
              .addData('users', {
                uid: res.user.uid,
                email: res.user.email,
                mobile: res.user.phoneNumber,
                displayName: res.user.displayName,
                photoURL: res.user.photoURL,
                isVerified: false,
                isPro: false,
                active: false,
                lastLogin: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
                deleted: false,
                courseList: [],
              })
              .then((res) => {
                this.router.navigate(['/profile', res.id]);
              });
          });
        return res;
      })
    ).pipe(
      catchError(this.handleErrors),
      tap((res) => res)
    );
  }

  logout(): Observable<void> {
    return from(this.auth.signOut());
  }
}
