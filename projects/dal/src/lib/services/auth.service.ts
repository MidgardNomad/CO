import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { EmailAuthProvider } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //Class Properties
  currentUserChange = new BehaviorSubject<boolean>(null);
  user = this.auth.user;
  activeUser = this.auth.currentUser;

  constructor(private auth: AngularFireAuth) {}

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
        .then(async (res) => {
          resolve(res);
          // console.log(res.user.displayName);
          // this.verifyEmail(res.user)
          //   .then((_) => resolve(res))
          //   .catch((error) => error);
        })
        .catch((error) => reject(error));
    });
  }

  async verifyEmail(user: firebase.default.User): Promise<void> {
    return new Promise((resolve, reject) => {
      user
        .sendEmailVerification()
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }

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
