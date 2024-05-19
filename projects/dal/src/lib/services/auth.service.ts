import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  catchError,
  from,
  tap,
  throwError,
} from 'rxjs';
import { User } from '../models/user/user';
import { CrudService } from './crud.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //Class Properties
  currentUser = new BehaviorSubject<User>(null);
  user = this.auth.user;
  stayLoggedIn = true;
  constructor(
    private auth: AngularFireAuth,
    private crudService: CrudService,
    private router: Router,
    private userService: UserService
  ) {}

  //Class Getters
  get getStayLoggedIn(): boolean {
    return this.stayLoggedIn;
  }

  //Class Setters
  set setStayLoggedIn(val: boolean) {
    this.stayLoggedIn = val;
  }

  //Class Utilities
  handleErrors(err: firebase.default.FirebaseError) {
    console.log(err);
    if (!err || !err.code) {
      return throwError(
        () => new Error('Something went Wrong! Please, Try Again.')
      );
    }
    return throwError(() => new Error('Invalid Email'));
  }

  //Class Methods
  login(
    email: string,
    password: string,
    stayLoggedIn: boolean
  ): Observable<firebase.default.auth.UserCredential> {
    return from(
      this.auth.setPersistence(stayLoggedIn ? 'local' : 'session').then(() =>
        this.auth.signInWithEmailAndPassword(email, password).then((res) => {
          localStorage.setItem('flag', '0');
          this.router.navigate(['/profile', res.user.uid]);
          return res;
        })
      )
    );
  }

  signUp(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Observable<firebase.default.auth.UserCredential> {
    return from(
      this.auth.createUserWithEmailAndPassword(email, password).then((res) => {
        localStorage.setItem('flag', '0');
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
    localStorage.removeItem('flag');
    return from(this.auth.signOut());
  }
}
