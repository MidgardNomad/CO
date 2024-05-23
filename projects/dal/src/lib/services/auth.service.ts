import { Injectable, inject } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { EmailAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';
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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //Class Properties
  currentUserChange = new BehaviorSubject<boolean>(null);
  user = this.auth.user;

  constructor(
    private auth: AngularFireAuth,
    private crudService: CrudService,
    private router: Router
  ) {}

  //Class Getters

  //Class Setters

  //Class Utilities
  private handleErrors(err: firebase.default.FirebaseError) {
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

  private reauthenticate(
    password: string
  ): Promise<firebase.default.auth.UserCredential> {
    let user: firebase.default.User;
    this.user.subscribe((currentUser) => {
      user = currentUser;
    });
    return new Promise((resolve, reject) => {
      user
        .reauthenticateWithCredential(
          EmailAuthProvider.credential(user.email, password)
        )
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  //Class Methods
  login(
    email: string,
    password: string,
    stayLoggedIn: boolean | '',
    redirect = true
  ): Observable<firebase.default.auth.UserCredential> {
    this.auth.setPersistence(stayLoggedIn ? 'local' : 'session').then();
    return from(
      this.auth.signInWithEmailAndPassword(email, password).then((res) => {
        this.crudService.getSingleData('users', res.user.uid).subscribe(() => {
          if (redirect) this.router.navigate(['profile', res.user.uid]);
        });
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
    const userFirstName = firstName
      .trim()
      .replace(firstName[0], firstName[0].toUpperCase());
    const userLastName = lastName
      .trim()
      .replace(lastName[0], lastName[0].toUpperCase());
    return from(
      this.auth.createUserWithEmailAndPassword(email, password).then((res) => {
        res.user
          .updateProfile({
            displayName: `${userFirstName} ${userLastName}`,
            photoURL: '../../../../../assets/images/placeholder-avatar.svg',
          })
          .then(() => {
            this.crudService
              .setSingleDoc('users', res.user.uid, {
                id: res.user.uid,
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
                connectedAccounts: [],
              } as User)
              .then();
            this.router.navigate(['/profile', res.user.uid]);
          });
        return res;
      })
    ).pipe(
      catchError(this.handleErrors),
      tap((res) => res)
    );
  }

  changePassword(oldPassword: string, newPassword: string) {
    return this.user.pipe(
      map((user) => {
        user
          .reauthenticateWithCredential(
            EmailAuthProvider.credential(user.email, oldPassword)
          )
          .then(
            () => {
              user.updatePassword(newPassword).then(
                (res) => res,
                (err) => err
              );
            },
            (err) => err.code
          );
      })
    );
  }

  logout(): Observable<void> {
    return from(
      this.auth.signOut().then(() => {
        this.router.navigate(['/auth']);
      })
    );
  }

  deleteAccount(password: string): Observable<void> {
    return this.user
      .pipe(
        map((user) => {
          user
            .reauthenticateWithCredential(
              EmailAuthProvider.credential(user.email, password)
            )
            .then(() => {
              this.crudService.deleteData('users', user.uid).then();
              user.delete().then(
                (res) => {
                  this.logout().subscribe();
                  return res;
                },
                (err) => err.code
              );
            });
        })
      )
      .pipe(
        catchError(this.handleErrors),
        tap((res) => res)
      );
  }
}
