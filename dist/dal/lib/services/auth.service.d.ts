import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export declare class AuthService {
    private auth;
    currentUserChange: BehaviorSubject<boolean>;
    user: import("rxjs").Observable<import("firebase/compat").default.User>;
    activeUser: Promise<import("firebase/compat").default.User>;
    constructor(auth: AngularFireAuth);
    signIn(email: string, password: string, stayLoggedIn: boolean | ''): Promise<firebase.default.auth.UserCredential>;
    signUp(email: string, password: string): Promise<firebase.default.auth.UserCredential>;
    verifyEmail(user: firebase.default.User): Promise<void>;
    resetPasswordEmail(email: string): Promise<unknown>;
    reauthenticate(password: string): Promise<firebase.default.auth.UserCredential>;
    updateDisplayName(firstName: string, lastName: string): Promise<void>;
    updatePhoto(photoURL: string): Promise<void>;
    updateEmail(email: string): Promise<void>;
    changePassword(newPassword: string): Promise<void>;
    logout(): Promise<void>;
    deleteAccount(): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthService>;
}
