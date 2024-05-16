import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, catchError, from, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //Class Properties
  currentUser: Observable<firebase.default.User | null> = this.auth.user;
  stayLoggedIn = true;
  constructor(private auth: AngularFireAuth) {}

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
    password: string
  ): Observable<firebase.default.auth.UserCredential> {
    return from(
      this.auth.signInWithEmailAndPassword(email, password).then((res) => res)
    );
  }

  signUp(
    email: string,
    password: string
  ): Observable<firebase.default.auth.UserCredential | Observable<never>> {
    return from(
      this.auth
        .createUserWithEmailAndPassword(email, password)
        .then((res) => res)
    ).pipe(
      catchError(this.handleErrors),
      tap((res) => res)
    );
  }

  logout(): Observable<void> {
    return from(this.auth.signOut());
  }
}
