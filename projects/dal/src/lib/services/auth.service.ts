import { Injectable, inject } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { EmailAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //Class Properties
  currentUserChange = new BehaviorSubject<boolean>(null);
  user = this.auth.user;
  activeUser = this.auth.currentUser;

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

  //Class Methods
  async signIn(
    email: string,
    password: string,
    stayLoggedIn: boolean | ''
  ): Promise<firebase.default.auth.UserCredential> {
    this.auth.setPersistence(stayLoggedIn ? 'local' : 'session').then();
    return new Promise((resolve, reject) => {
      this.auth
        .signInWithEmailAndPassword(email, password)
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }

  async signUp(
    email: string,
    password: string
  ): Promise<firebase.default.auth.UserCredential> {
    return new Promise((resolve, reject) => {
      this.auth
        .createUserWithEmailAndPassword(email, password)
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }

  // async verifyEmail(email: string) {
  //   let user = await this.auth.currentUser;
  //   return new Promise((resolve, reject) => {
  //     user.sendEmailVerification
  //   })
  // }

  async reauthenticate(
    password: string
  ): Promise<firebase.default.auth.UserCredential> {
    let user = await this.auth.currentUser;
    return new Promise((resolve, reject) => {
      user
        .reauthenticateWithCredential(
          EmailAuthProvider.credential(user.email, password)
        )
        .then((userCre) => resolve(userCre))
        .catch((err) => reject(err));
    });
  }

  async updateDisplayName(firstName: string, lastName: string): Promise<void> {
    let user = await this.auth.currentUser;
    if (firstName === '') firstName = user.displayName.split(' ')[0];
    if (lastName === '') lastName = user.displayName.split(' ')[1];
    return new Promise((resolve, reject) => {
      user
        .updateProfile({
          displayName: `${firstName} ${lastName}`,
        })
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }

  async updateEmail(email: string): Promise<void> {
    const user = await this.auth.currentUser;
    return new Promise((resolve, reject) => {
      user
        .updateEmail(email)
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }

  async changePassword(newPassword: string): Promise<void> {
    let user = await this.auth.currentUser;
    return new Promise((resolve, reject) => {
      user
        .updatePassword(newPassword)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  async logout(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.auth
        .signOut()
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }

  async deleteAccount(): Promise<void> {
    let user = await this.auth.currentUser;
    return new Promise((resolve, reject) => {
      user
        .delete()
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }
}
