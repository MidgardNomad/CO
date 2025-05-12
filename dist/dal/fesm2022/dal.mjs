import * as i0 from '@angular/core';
import { Injectable, Component, NgModule } from '@angular/core';
import * as i1 from '@angular/fire/compat/firestore';
import * as i1$1 from '@angular/fire/compat';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule } from '@angular/forms';
import * as i1$2 from '@angular/fire/compat/auth';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { map, BehaviorSubject } from 'rxjs';
import * as i1$3 from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { EmailAuthProvider } from '@angular/fire/auth';
import * as AWS from 'aws-sdk';
import { v4 } from 'uuid';

class DALService {
    constructor(firestore) {
        this.firestore = firestore;
    }
    getData() {
        // get admin collections available in career officer project
        return {
            collections: ['users', 'admin', 'career', 'path', 'course', 'class', 'content', 'quiz',],
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DALService, deps: [{ token: i1.AngularFirestore }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DALService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DALService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.AngularFirestore }]; } });

class DALComponent {
    constructor() { }
    ngOnInit() {
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DALComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: DALComponent, selector: "lib-DAL", ngImport: i0, template: `
    <p>
      dal works!
    </p>
  `, isInline: true }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DALComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-DAL', template: `
    <p>
      dal works!
    </p>
  ` }]
        }], ctorParameters: function () { return []; } });

const environment = {
    production: false,
    firebaseConfig: {
        apiKey: 'AIzaSyD-Wv3H0LpWEriiy4S5-yWnsmSLf0iK2PU',
        authDomain: 'career-officer.firebaseapp.com',
        projectId: 'career-officer',
        storageBucket: 'career-officer.appspot.com',
        messagingSenderId: '902443961352',
        appId: '1:902443961352:web:99a41627c82a50ecdbd5bd',
        measurementId: 'G-M3C1GE1CDW',
    },
    api: 'https://ep.careerofficer.org/',
    // stripeAPI:
    //   'pk_test_51Mr8zqEoIQFHfSQMKneIeSm21UQ3KEQgAoWWU2kpqshEM8XP0EB1BA7HiwAEJ9U2IrHn7hzNcRFolDu6sittM5Sg00p5wOxcHG',
    // env: 'test',
    stripeAPI: 'pk_test_51Mr8zqEoIQFHfSQMKneIeSm21UQ3KEQgAoWWU2kpqshEM8XP0EB1BA7HiwAEJ9U2IrHn7hzNcRFolDu6sittM5Sg00p5wOxcHG',
    env: 'test',
    tinyApiKey: 'q041l2n8hnprcdmi5qb3j4gzzxk5bz3af0dyxfl65z5fuzic',
    userToken: 'T',
};

class CrudService {
    constructor(db) {
        this.db = db;
    }
    // get all data (snapshot)
    getData(collection) {
        return this.db.collection(collection).snapshotChanges();
    }
    //get all data using get()
    getAllData(collection) {
        return this.db.collection(collection).get();
    }
    //set a single Document with a custom ID
    setSingleDoc(collectionName, docID, data) {
        return this.db.doc(`/${collectionName}/${docID}`).set(data);
    }
    //Get a document by ID
    getSignleDoc(collectionName, docID) {
        return this.db.doc(`/${collectionName}/${docID}`).get();
    }
    //Create a subcollection
    addDataToSubCollection(collectionPath, data) {
        return this.db.collection(collectionPath).add(data);
    }
    //get data from a sub collection
    getSubCollectionData(collectionPath) {
        return this.db.collection(collectionPath).get();
    }
    // add data
    addData(collectionName, data) {
        return this.db.collection(collectionName).add(data);
    }
    // update data
    updateData(collectionName, id, data) {
        return this.db.collection(collectionName).doc(id).update(data);
    }
    // delete data
    deleteData(collectionName, id) {
        return this.db.collection(collectionName).doc(id).delete();
    }
    // get single data
    getSingleData(collectionName, id) {
        return this.db.collection(collectionName).doc(id).get();
    }
    //Get Single Doc snapshot
    getSignleDocSnap(collectionName, id) {
        return this.db.collection(collectionName).doc(id).snapshotChanges();
    }
    //Get Data Ordered
    getDataByOrder(collectionpath, field) {
        return this.db
            .collection(collectionpath, (ref) => ref.orderBy(field))
            .snapshotChanges();
    }
    getSingleDocByField(collectionName, field, value) {
        return this.db
            .collection(collectionName, (ref) => ref.where(field, '==', value))
            .get();
    }
    getDocByTwoField(collectionName, field1, value1, field2, value2) {
        return this.db
            .collection(collectionName, (ref) => ref.where(field1, '==', value1).where(field2, '==', value2))
            .get().pipe(map((res) => res.docs.map((c) => { return { ...c.data() }; })));
    }
    getDocByThreeField(collectionName, field1, value1, field2, value2, field3, value3) {
        return this.db
            .collection(collectionName, (ref) => ref.where(field1, '==', value1).where(field2, '==', value2).where(field3, '==', value3))
            .get().pipe(map((res) => res.docs.map((c) => { return { ...c.data(), id: c.id }; })));
    }
    // get single data snapshotChanges
    getSingleDataByField(collectionName, field, value) {
        return this.db
            .collection(collectionName, (ref) => ref.where(field, '==', value))
            .snapshotChanges();
    }
    // get single data snapshotChanges
    getDataByOneField(collectionName, field, value) {
        return this.db
            .collection(collectionName, (ref) => ref.where(field, '==', value))
            .get().pipe(map((res) => res.docs.map((c) => { return { ...c.data(), id: c.id }; })));
    }
    // get single data Asc
    getSingleDataAsc(collectionName) {
        return this.db
            .collection(collectionName, (ref) => ref.orderBy('seqNo').limit(1))
            .get().pipe(map(data => { const doc = data.docs[0]; return doc ? { id: doc.id, ...doc.data } : null; }));
    }
    // get single data
    getSingleDataByFieldWithLimit(collectionName, field, value, limit) {
        return this.db
            .collection(collectionName, (ref) => ref.where(field, '==', value).limit(limit))
            .snapshotChanges();
    }
    // get single data
    getSingleDataByFieldWithOrder(collectionName, field, value, orderField, order) {
        return this.db
            .collection(collectionName, (ref) => ref.where(field, '==', value).orderBy(orderField, order))
            .snapshotChanges();
    }
    // get single data
    getSingleDataByFieldWithOrderAndLimit(collectionName, field, value, orderField, order, limit) {
        return this.db
            .collection(collectionName, (ref) => ref.where(field, '==', value).orderBy(orderField, order).limit(limit))
            .snapshotChanges();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: CrudService, deps: [{ token: i1.AngularFirestore }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: CrudService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: CrudService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.AngularFirestore }]; } });

class CoursesService {
    constructor(crudSerive) {
        this.crudSerive = crudSerive;
        this._coursesCollection = 'courses';
        this._chaptersCollection = 'chapters';
        this._projectsCollection = 'project';
        this._lecturesCollection = 'lectures';
        this._slidesCollection = 'slides';
    }
    //Courses Methods:
    //=============================================================
    getAllCourses() {
        return this.crudSerive
            .getDataByOrder(this._coursesCollection, 'seqNo')
            .pipe(map((docSnapShots) => {
            return docSnapShots.map((docSnap) => {
                return {
                    id: docSnap.payload.doc.id,
                    ...docSnap.payload.doc.data(),
                };
            });
        }));
    }
    getCourse(courseID) {
        return this.crudSerive.getSignleDoc(this._coursesCollection, courseID).pipe(map((courseDocSnap) => {
            return {
                id: courseDocSnap.id,
                ...courseDocSnap.data(),
            };
        }));
    }
    async createNewCourse(courseTitle, courseDescription, seqNo) {
        return new Promise((resolve, reject) => {
            this.crudSerive
                .addData(this._coursesCollection, {
                title: courseTitle,
                description: courseDescription,
                seqNo,
            })
                .then((res) => resolve(res))
                .catch((error) => reject(error));
        });
    }
    async editCourse(courseID, data) {
        return new Promise((resolve, reject) => {
            this.crudSerive
                .updateData(this._coursesCollection, courseID, data)
                .then((res) => resolve(res))
                .catch((error) => reject(error));
        });
    }
    async deleteCourse(courseID) {
        return new Promise((resolve, reject) => {
            this.crudSerive
                .deleteData(this._coursesCollection, courseID)
                .then((res) => resolve(res))
                .catch((error) => reject(error));
        });
    }
    //=============================================================
    //Chapters Methods:
    //=============================================================
    //Get all chapters
    getChapters(courseID) {
        return this.crudSerive
            .getDataByOrder(`/${this._coursesCollection}/${courseID}/${this._chaptersCollection}`, 'seqNo')
            .pipe(map((docSnaps) => {
            return docSnaps.map((snap) => {
                return {
                    id: snap.payload.doc.id,
                    ...snap.payload.doc.data(),
                };
            });
        }));
    }
    //Get chapter ID by seqNo: 1
    getFirstChapter(courseID) {
        return this.crudSerive
            .getSingleDataByField(`/${this._coursesCollection}/${courseID}/${this._chaptersCollection}`, 'seqNo', 1)
            .pipe(map((chapterDocSnap) => {
            return chapterDocSnap[0].payload.doc.id;
        }));
    }
    async createNewCourseChapter(courseID, data) {
        return new Promise((resolve, reject) => {
            this.crudSerive
                .addDataToSubCollection(`/${this._coursesCollection}/${courseID}/${this._chaptersCollection}`, data)
                .then((res) => resolve(res))
                .catch((error) => reject(error));
        });
    }
    async editChapterDetails(courseID, chapterID, data) {
        return new Promise((resolve, reject) => {
            this.crudSerive
                .updateData(`/${this._coursesCollection}/${courseID}/${this._chaptersCollection}`, chapterID, data)
                .then((res) => resolve(res))
                .catch((error) => reject(error));
        });
    }
    async deleteChapter(courseID, chapterID) {
        return new Promise((resolve, reject) => {
            this.crudSerive
                .deleteData(`/${this._coursesCollection}/${courseID}/${this._chaptersCollection}`, chapterID)
                .then((res) => resolve(res))
                .catch((error) => reject(error));
        });
    }
    //=============================================================
    //Projects Methods:
    //=============================================================
    // add Project
    addProjects(id, data) {
        this.crudSerive.addData(`${this._coursesCollection}/${id}/${this._projectsCollection}`, data);
    }
    // Get Data From Collection Project
    getDataProject(id) {
        return this.crudSerive
            .getData(`${this._coursesCollection}/${id}/${this._projectsCollection}`)
            .pipe(map((data) => {
            return data.map((ele) => {
                return {
                    id: ele.payload.doc.id,
                    ...ele.payload.doc.data(),
                };
            });
        }));
    }
    // delet Project
    deletProject(id, uid) {
        return this.crudSerive.deleteData(`${this._coursesCollection}/${id}/${this._projectsCollection}`, uid);
    }
    // getOne For card Project
    getOneProject(id, uid) {
        return this.crudSerive
            .getSignleDoc(`${this._coursesCollection}/${id}/${this._projectsCollection}`, uid)
            .pipe(map((projectDocSnap) => {
            return { ...projectDocSnap.data() };
        }));
    }
    //  Edit Card For Project
    editCard(id, uid, title) {
        return this.crudSerive.updateData(`${this._coursesCollection}/${id}/${this._projectsCollection}`, uid, { title });
    }
    //  Edit Content inside Project
    editContent(courseID, uid, content) {
        return this.crudSerive.updateData(`${this._coursesCollection}/${courseID}/${this._projectsCollection}/`, uid, {
            content,
        });
    }
    //=============================================================
    //=============================================================
    //Lectures Methods:
    //=============================================================
    getAllLectures(courseID, chapterID) {
        return this.crudSerive
            .getDataByOrder(`/${this._coursesCollection}/${courseID}/${this._chaptersCollection}/${chapterID}/${this._lecturesCollection}`, 'seqNo')
            .pipe(map((docSnaps) => {
            return docSnaps.map((doc) => {
                return {
                    id: doc.payload.doc.id,
                    ...doc.payload.doc.data(),
                };
            });
        }));
    }
    getFirstLecture(courseID, chapterId) {
        return this.crudSerive
            .getSingleDataByField(`/${this._coursesCollection}/${courseID}/${this._chaptersCollection}/${chapterId}/${this._lecturesCollection}`, 'seqNo', 1)
            .pipe(map((docSnaps) => {
            return docSnaps[0].payload.doc.id;
        }));
    }
    async addNewLecture(courseID, chapterID, data) {
        return new Promise((resolve, reject) => {
            this.crudSerive
                .addDataToSubCollection(`/${this._coursesCollection}/${courseID}/${this._chaptersCollection}/${chapterID}/${this._lecturesCollection}`, data)
                .then((res) => resolve(res))
                .catch((error) => reject(error));
        });
    }
    async editLectureDetails(courseID, chapterID, lectureID, data) {
        return new Promise((resolve, reject) => {
            this.crudSerive
                .updateData(`/${this._coursesCollection}/${courseID}/${this._chaptersCollection}/${chapterID}/${this._lecturesCollection}`, lectureID, data)
                .then((res) => resolve(res))
                .catch((error) => reject(error));
        });
    }
    async deleteLecture(courseID, chapterID, lectureID) {
        return new Promise((resolve, reject) => {
            this.crudSerive
                .deleteData(`/${this._coursesCollection}/${courseID}/${this._chaptersCollection}/${chapterID}/${this._lecturesCollection}`, lectureID)
                .then((res) => resolve(res))
                .catch((error) => reject(error));
        });
    }
    //=============================================================
    //=============================================================
    //Slides Methods:
    //=============================================================
    getAllSlides(courseID, chapterID, lectureID) {
        return this.crudSerive
            .getDataByOrder(`/${this._coursesCollection}/${courseID}/${this._chaptersCollection}/${chapterID}/${this._lecturesCollection}/${lectureID}/${this._slidesCollection}`, 'seqNo')
            .pipe(map((docSnaps) => {
            return docSnaps.map((docSnap) => {
                return {
                    id: docSnap.payload.doc.id,
                    ...docSnap.payload.doc.data(),
                };
            });
        }));
    }
    async addSlide(courseID, chapterID, lectureID, data) {
        return new Promise((resolve, reject) => {
            this.crudSerive
                .addDataToSubCollection(`/${this._coursesCollection}/${courseID}/${this._chaptersCollection}/${chapterID}/${this._lecturesCollection}/${lectureID}/${this._slidesCollection}`, data)
                .then((res) => resolve(res))
                .catch((error) => reject(error));
        });
    }
    async editSlide(courseID, chapterID, lectureID, slideID, data) {
        return new Promise((resolve, reject) => {
            this.crudSerive
                .updateData(`/${this._coursesCollection}/${courseID}/${this._chaptersCollection}/${chapterID}/${this._lecturesCollection}/${lectureID}/${this._slidesCollection}`, slideID, data)
                .then((res) => resolve(res))
                .catch((error) => reject(error));
        });
    }
    async deleteSlide(courseID, chapterID, lectureID, slideID) {
        return new Promise((resolve, reject) => {
            this.crudSerive
                .deleteData(`/${this._coursesCollection}/${courseID}/${this._chaptersCollection}/${chapterID}/${this._lecturesCollection}/${lectureID}/${this._slidesCollection}`, slideID)
                .then((res) => resolve(res))
                .catch((error) => reject(error));
        });
    }
    getFirstCourse() {
        return this.crudSerive.getSingleDataAsc(this._coursesCollection);
        // return new Promise((resolve,reject)=>{
        // })
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: CoursesService, deps: [{ token: CrudService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: CoursesService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: CoursesService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: CrudService }]; } });

class DALModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DALModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: DALModule, declarations: [DALComponent], imports: [i1$1.AngularFireModule, AngularFireAuthModule,
            HttpClientModule], exports: [FormsModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DALModule, providers: [CoursesService], imports: [AngularFireModule.initializeApp(environment.firebaseConfig),
            AngularFireAuthModule,
            HttpClientModule, FormsModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DALModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [DALComponent],
                    imports: [
                        AngularFireModule.initializeApp(environment.firebaseConfig),
                        AngularFireAuthModule,
                        HttpClientModule
                    ],
                    exports: [FormsModule],
                    providers: [CoursesService],
                }]
        }] });

class AuthService {
    constructor(auth) {
        this.auth = auth;
        //Class Properties
        this.currentUserChange = new BehaviorSubject(null);
        this.user = this.auth.user;
        this.activeUser = this.auth.currentUser;
    }
    //Class Methods
    async signIn(email, password, stayLoggedIn) {
        await this.auth.setPersistence(stayLoggedIn ? 'local' : 'session').then();
        return new Promise((resolve, reject) => {
            this.auth
                .signInWithEmailAndPassword(email, password)
                .then((res) => resolve(res))
                .catch((error) => reject(error));
        });
    }
    async signUp(email, password) {
        return new Promise((resolve, reject) => {
            this.auth
                .createUserWithEmailAndPassword(email, password)
                .then((res) => resolve(res))
                .catch((error) => reject(error));
        });
    }
    async verifyEmail(user) {
        return new Promise((resolve, reject) => {
            user
                .sendEmailVerification()
                .then((res) => resolve(res))
                .catch((error) => reject(error));
        });
    }
    async resetPasswordEmail(email) {
        return new Promise((resolve, reject) => {
            this.auth
                .sendPasswordResetEmail(email)
                .then((res) => resolve(res))
                .catch((error) => reject(error));
        });
    }
    async reauthenticate(password) {
        let user = await this.auth.currentUser;
        return new Promise((resolve, reject) => {
            user
                .reauthenticateWithCredential(EmailAuthProvider.credential(user.email, password))
                .then((userCre) => resolve(userCre))
                .catch((err) => reject(err));
        });
    }
    async updateDisplayName(firstName, lastName) {
        let user = await this.auth.currentUser;
        if (firstName === '')
            firstName = user.displayName.split(' ')[0];
        if (lastName === '')
            lastName = user.displayName.split(' ')[1];
        return new Promise((resolve, reject) => {
            user
                .updateProfile({
                displayName: `${firstName} ${lastName}`,
            })
                .then((res) => resolve(res))
                .catch((error) => reject(error));
        });
    }
    async updatePhoto(photoURL) {
        let user = await this.auth.currentUser;
        return new Promise((resolve, reject) => {
            user
                .updateProfile({
                photoURL,
            })
                .then(resolve)
                .catch(reject);
        });
    }
    // async verifyNewEamil() {
    //   this.activeUser.ve
    // }
    async updateEmail(email) {
        const user = await this.auth.currentUser;
        return new Promise((resolve, reject) => {
            user
                .verifyBeforeUpdateEmail(email)
                .then((res) => resolve(res))
                .catch((error) => reject(error));
        });
    }
    async changePassword(newPassword) {
        let user = await this.auth.currentUser;
        return new Promise((resolve, reject) => {
            user
                .updatePassword(newPassword)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }
    async logout() {
        return new Promise((resolve, reject) => {
            this.auth
                .signOut()
                .then((res) => resolve(res))
                .catch((error) => reject(error));
        });
    }
    async deleteAccount() {
        let user = await this.auth.currentUser;
        return new Promise((resolve, reject) => {
            user
                .delete()
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AuthService, deps: [{ token: i1$2.AngularFireAuth }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AuthService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AuthService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1$2.AngularFireAuth }]; } });

class UsersService {
    constructor(crudService, authService) {
        this.crudService = crudService;
        this.authService = authService;
        this._usersCollection = 'users';
        this._coursesCollection = 'courses';
        this._bookedSessionsCollection = 'booked-sessions';
        this._projectsCollection = 'projects';
    }
    async createUserDoc(newUser, country, countryCode) {
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
                paid: true,
                sessionExpirationDate: null,
                // availableSessions: null,
            })
                .then((res) => resolve(res))
                .catch((error) => reject(error));
        });
    }
    getUser() {
        this.authService.user.subscribe((userAuthObj) => {
            if (userAuthObj == null) {
                this.userDoc = null;
            }
            else {
                this.userDoc = this.getActiveUser(userAuthObj.uid);
            }
        });
    }
    getAllUsers() {
        return this.crudService.getData(this._usersCollection).pipe(map((docSnaps) => {
            return docSnaps.map((docSnap) => {
                return {
                    id: docSnap.payload.doc.id,
                    ...docSnap.payload.doc.data(),
                };
            });
        }));
    }
    getActiveUser(userID) {
        return this.crudService
            .getSignleDocSnap(this._usersCollection, userID)
            .pipe(map((userDocSnap) => {
            return {
                id: userDocSnap.payload.id,
                ...userDocSnap.payload.data(),
            };
        }));
    }
    getSingleUser(userID) {
        return this.crudService.getSignleDoc(this._usersCollection, userID).pipe(map((userDocSnap) => {
            console.log('userDocSnap', userDocSnap);
            return {
                id: userDocSnap.id,
                isExist: userDocSnap.exists,
                ...userDocSnap.data(),
            };
        }));
    }
    // get data coursrs
    getUserCourses(userID) {
        return this.crudService
            .getSubCollectionData(`/${this._usersCollection}/${userID}/${this._coursesCollection}`)
            .pipe(map((courseDocSanps) => {
            return courseDocSanps.docs.map((courseDocSnap) => {
                return {
                    id: courseDocSnap.id,
                    ...courseDocSnap.data(),
                };
            });
        }));
    }
    //Enroll User in Course
    async enrollInCourse(userID, courseID, data) {
        return new Promise((resolve, reject) => {
            this.crudService
                .setSingleDoc(`${this._usersCollection}/${userID}/${this._coursesCollection}`, courseID, data)
                .then((response) => resolve(response))
                .catch((error) => reject(error));
        });
    }
    async addCourseLevelToUserDoc(userID, courseLevel) {
        return new Promise((resolve, reject) => {
            this.crudService
                .updateData('users', userID, { courseList: courseLevel })
                .then((res) => resolve(res))
                .catch((error) => reject(error));
        });
    }
    async updateUserStearkDays(userID, streakDays, maxStreak, currentStreak) {
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
    async updateUserDoc(user) {
        return new Promise((resolve, reject) => {
            this.crudService
                .updateData('users', user.id, user)
                .then(resolve)
                .catch(reject);
        });
    }
    async TareCurrentStreak(userID) {
        return new Promise((resolve, reject) => {
            this.crudService
                .updateData('users', userID, { currentStreak: 0 })
                .then(resolve)
                .catch(reject);
        });
    }
    //Books Sessions:
    async bookSession(session) {
        return new Promise((resolve, reject) => {
            this.crudService
                .addData(this._bookedSessionsCollection, session)
                .then((res) => resolve(res))
                .catch((error) => reject(error));
        });
    }
    //Projects
    getUserProjects(userID) {
        return this.crudService
            .getData(`/${this._usersCollection}/${userID}/${this._projectsCollection}`)
            .pipe(map((userProjectsDocs) => {
            return userProjectsDocs.map((project) => {
                return {
                    id: project.payload.doc.id,
                    ...project.payload.doc.data(),
                };
            });
        }));
    }
    async submitProject(userID, project) {
        return new Promise((resolve, reject) => {
            this.crudService
                .addData(`${this._usersCollection}/${userID}/${this._projectsCollection}`, project)
                .then(resolve)
                .catch(reject);
        });
    }
    //user setttings
    async addUserSocials(userID, socials) {
        return new Promise((resolve, reject) => {
            this.crudService
                .updateData(this._usersCollection, userID, socials)
                .then((res) => resolve(res))
                .catch((error) => reject(error));
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UsersService, deps: [{ token: CrudService }, { token: AuthService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UsersService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UsersService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: CrudService }, { type: AuthService }]; } });

class CareerPathService {
    constructor(crudService) {
        this.crudService = crudService;
        this._careerPathCollection = 'career-path';
    }
    // Career Path Collection
    getAllCareerPaths() {
        return this.crudService.getData(this._careerPathCollection).pipe(map((docSnaps) => {
            return docSnaps.map((docSnap) => {
                return {
                    id: docSnap.payload.doc.id,
                    ...docSnap.payload.doc.data(),
                };
            });
        }));
    }
    async addNewCareerPath(title, description) {
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
    async addCourseToCareerPath(course, careerPathID) {
        return new Promise((resolve, reject) => {
            this.crudService
                .setSingleDoc(`${this._careerPathCollection}/${careerPathID}/courses`, course.id, course)
                .then((res) => resolve(res))
                .catch((error) => reject(error));
        });
    }
    async updateCareerPath(ID, title, description) {
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
    async deleteCareerPath(cpID) {
        return new Promise((resolve, reject) => {
            this.crudService
                .deleteData(this._careerPathCollection, cpID)
                .then((res) => resolve(res))
                .catch((error) => reject(error));
        });
    }
    // Courses SubCollection
    getAllCareerCourses(careerID) {
        return this.crudService
            .getData(`/${this._careerPathCollection}/${careerID}/courses`)
            .pipe(map((careerDocSnaps) => {
            return careerDocSnaps.map((careerDoc) => {
                return {
                    id: careerDoc.payload.doc.id,
                    ...careerDoc.payload.doc.data(),
                };
            });
        }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: CareerPathService, deps: [{ token: CrudService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: CareerPathService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: CareerPathService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: CrudService }]; } });

class PackagesService {
    constructor() { }
    getAllPackages() {
    }
    getOneDetails(id) {
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PackagesService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PackagesService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PackagesService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class PaymentService {
    constructor(http) {
        this.http = http;
    }
    createPaymentIntent(obj) {
        return this.http.post(`${environment.api}payment/create-payment-intent`, obj).toPromise();
    }
    checkPayment(obj) {
        return this.http.post(`${environment.api}payment/check-payment`, obj).toPromise();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PaymentService, deps: [{ token: i1$3.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PaymentService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PaymentService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1$3.HttpClient }]; } });

class LearnService {
    constructor(crudService) {
        this.crudService = crudService;
        this._coursesCollection = 'courses';
        this._chaptersCollection = 'chapters';
        this._lecturesCollection = 'lectures';
    }
    getSingleLectureByID(courseID, chapterID, lectureId) {
        return this.crudService
            .getSingleData(`/${this._coursesCollection}/${courseID}/${this._chaptersCollection}/${chapterID}/${this._lecturesCollection}`, lectureId)
            .pipe(map((docSnap) => {
            return {
                id: docSnap.id,
                ...docSnap.data(),
            };
        }));
    }
    getNextLectureID(courseID, chapterID, seqNo) {
        return this.crudService
            .getSingleDocByField(`/${this._coursesCollection}/${courseID}/${this._chaptersCollection}/${chapterID}/${this._lecturesCollection}`, 'seqNo', seqNo)
            .pipe(map((lectures) => {
            return lectures.docs.map((lecture) => {
                return lecture.id;
            });
        }));
    }
    getFirstLectureIDOfChapter(courseId, chapterId) {
        return this.crudService
            .getSingleDataByField(`/${this._coursesCollection}/${courseId}/${this._chaptersCollection}/${chapterId}/${this._lecturesCollection}`, 'seqNo', 1)
            .pipe(map((lectureDocs) => {
            return lectureDocs.map((lectureDoc) => {
                return lectureDoc.payload.doc.id;
            });
        }));
    }
    //Chapters
    getSigleChapter(courseID, chapterID) {
        return this.crudService
            .getSingleData(`/${this._coursesCollection}/${courseID}/${this._chaptersCollection}/`, chapterID)
            .pipe(map((chapterDoc) => {
            return {
                id: chapterDoc.id,
                ...chapterDoc.data(),
            };
        }));
    }
    getNextChapterID(courseID, seqNo) {
        return this.crudService
            .getSingleDocByField(`${this._coursesCollection}/${courseID}/${this._chaptersCollection}`, 'seqNo', seqNo)
            .pipe(map((chapterDoc) => {
            if (chapterDoc.docs[0]?.exists) {
                return chapterDoc.docs[0].id;
            }
            else {
                return null;
            }
        }));
    }
    //Courses
    getNextCourseID(seqNo) {
        return this.crudService
            .getSingleDataByField(this._coursesCollection, 'seqNo', seqNo)
            .pipe(map((courseDocs) => {
            return courseDocs.map((courseDoc) => {
                return courseDoc.payload.doc.id;
            });
        }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LearnService, deps: [{ token: CrudService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LearnService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LearnService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: CrudService }]; } });

class MentorService {
    constructor(_crud) {
        this._crud = _crud;
        this._mentorsCollection = 'mentors';
        this._sessionsCollection = 'sessions';
        this._bookedSessions = 'booked-sessions';
    }
    getMentors() {
        return this._crud.getAllData(this._mentorsCollection).pipe(map((mentorsList) => {
            return mentorsList.docs.map((mentorDoc) => {
                return {
                    id: mentorDoc.id,
                    ...mentorDoc.data(),
                };
            });
        }));
    }
    getMentorByID(mentorID) {
        return this._crud.getSingleData(this._mentorsCollection, mentorID).pipe(map((mentorFBDoc) => {
            return {
                id: mentorFBDoc.id,
                ...mentorFBDoc.data(),
            };
        }));
    }
    addMentor(mentor) {
        return new Promise((resolve, reject) => {
            this._crud
                .addData(this._mentorsCollection, mentor)
                .then((res) => resolve(res))
                .catch((error) => reject(error));
        });
    }
    updateMentor(mentorID, mentor) {
        return this._crud.updateData(this._mentorsCollection, mentorID, mentor);
    }
    deleteMentor(mentorID) {
        return this._crud.deleteData(this._mentorsCollection, mentorID);
    }
    getMentorSessions(mentorID) {
        return this._crud.getDataByOneField(this._bookedSessions, 'mentorId', mentorID);
    }
    addToSessionSchedule(mentorID, session) {
        return new Promise((resolve, reject) => {
            this._crud
                .updateData(this._mentorsCollection, mentorID, {
                weeklySchedule: session,
            })
                .then((res) => resolve(res))
                .catch((error) => reject(error));
        });
    }
    getMenorBySessionID(sessionID) {
        return this._crud.getSingleDocByField(this._mentorsCollection, 'freeDay', sessionID).pipe(map(data => data.docs.map((res) => {
            return { ...res.data(), id: res.id };
        })));
    }
    getAllStudentReservedSession(day, date) {
        return this._crud.getDocByTwoField(this._bookedSessions, 'sessionDay', day, 'sessionDate', date);
    }
    // Edit Image For Profile Mentor
    updateMentorProfilePicture(mentorID, profilePicture) {
        return this._crud.updateData(this._mentorsCollection, mentorID, {
            profilePicture,
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: MentorService, deps: [{ token: CrudService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: MentorService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: MentorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: CrudService }]; } });

class PackagePricingService {
    constructor() {
        this.packagePriceInEGP = 1999;
        this.packagePriceInUSD = 49;
    }
    getPackagePriceAndCurrency(country) {
        const price = country === 'Egypt' ? this.packagePriceInEGP : this.packagePriceInUSD;
        const currency = country === 'Egypt' ? 'EGP' : 'USD';
        return { price: price, currency: currency };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PackagePricingService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PackagePricingService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PackagePricingService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class S3ImgUploaderService {
    constructor(http) {
        this.http = http;
        this.ID = 'AKIA4UUDZ7ELYTIWAQWH';
        this.SECRET = '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';
        this.BUCKET_NAME = 'tartibat';
    }
    uploadFile(file) {
        const contentType = file.type;
        const ext = file.name.split('.').pop();
        const bucket = new AWS.S3({
            accessKeyId: this.ID,
            secretAccessKey: this.SECRET,
            region: 'eu-central-1',
        });
        const params = {
            Bucket: this.BUCKET_NAME,
            Key: 'injaz/co/uploaded-' + v4() + '.' + ext,
            Body: file,
            ACL: 'public-read',
            ContentType: contentType,
        };
        return bucket.upload(params);
    }
    uploadParamsFile(file) {
        const contentType = file.type;
        const ext = file.name.split('.').pop();
        const bucket = new AWS.S3({
            accessKeyId: this.ID,
            secretAccessKey: this.SECRET,
            region: 'ap-south-1',
        });
        const params = {
            Bucket: this.BUCKET_NAME,
            Key: 'uploaded-' + v4() + '.' + ext,
            Body: file,
            ACL: 'public-read',
            ContentType: contentType,
        };
        let url = bucket.getSignedUrl('putObject', params);
        let options = {
            reportProgress: true,
            observe: 'events',
        };
        return url;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: S3ImgUploaderService, deps: [{ token: i1$3.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: S3ImgUploaderService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: S3ImgUploaderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1$3.HttpClient }]; } });

var LectureType;
(function (LectureType) {
    LectureType["Learn"] = "learn";
    LectureType["Admin"] = "admin";
    LectureType["Mentor"] = "mentor";
    LectureType["Interview"] = "interview";
})(LectureType || (LectureType = {}));

// create type enum
var SsType;
(function (SsType) {
    SsType["Text"] = "text";
    SsType["TextImage"] = "text-image";
    SsType["MCQ"] = "mcq";
    SsType["QFill"] = "q-fill";
})(SsType || (SsType = {}));

// week days enum
var WeekDays;
(function (WeekDays) {
    WeekDays["Sunday"] = "Sunday";
    WeekDays["Monday"] = "Monday";
    WeekDays["Tuesday"] = "Tuesday";
    WeekDays["Wednesday"] = "Wednesday";
    WeekDays["Thursday"] = "Thursday";
    WeekDays["Friday"] = "Friday";
    WeekDays["Saturday"] = "Saturday";
})(WeekDays || (WeekDays = {}));

class SessionService {
    constructor(_crud) {
        // get time zone from moment
        this._crud = _crud;
        this._mentorsCollection = 'mentors';
        this._bookedSessionsCollection = 'booked-sessions';
        // moment.tz.setDefault('Africa/Cairo');
        // console.log(' current time zone: ', moment.tz.guess());
        // const time = '20:00';
        // let day = new Date();
        // day.setDate(day.getDate() + ((0 + (7 - day.getDay())) % 7));
        // day.setHours(+time.split(':')[0]);
        // day.setMinutes(+time.split(':')[1]);
        // day.setSeconds(0);
        // if (day.getDate() === new Date().getDate()) {
        //   day.setDate(day.getDate() + 7);
        // }
        // // get current time and time zone
        // var a = moment.tz("2024-06-13 11:55", "Africa/Cairo");
        // // get time zone from moment
        // console.log(" current time zone: ", a.format());
        // // get qatar time of the same time
        // var b = a.clone().tz("Asia/Qatar");
        // console.log(" qatar time zone: ", b.format());
        // // get malaysia time of the same time
        // var c = a.clone().tz("Asia/Kuala_Lumpur");
        // console.log(" malaysia time zone: ", c.format());
        // // get london time of the same time
        // var d = a.clone().tz("Europe/London");
        // console.log(" london time zone: ", d.format());
        // // get new york time of the same time
        // var e = a.clone().tz("America/New_York");
        // console.log(" new york time zone: ", e.format());
    }
    getDate() {
        return this._crud.getAllData('_date').pipe(map((doc) => {
            return doc.docs.map((date) => {
                return date.data();
            });
        }));
    }
    getAllSessions() {
        return this._crud.getDataByOrder('sessions', 'index').pipe(map((rawData) => {
            return rawData.map((doc) => {
                return {
                    id: doc.payload.doc.id,
                    ...doc.payload.doc.data(),
                };
            });
        }));
    }
    bookSession(session) {
        return new Promise((resolve, reject) => {
            this._crud.addData(this._bookedSessionsCollection, session)
                .then((res) => resolve(res))
                .catch((error) => reject(error));
        });
    }
    cancelSession(userID, mentorID, date) {
        return new Promise((resolve, reject) => {
            this._crud.getDocByThreeField(this._bookedSessionsCollection, 'userId', userID, 'mentorId', mentorID, 'sessionDate', date).subscribe(res => {
                console.log(res);
                if (res?.length > 0) {
                    this._crud.deleteData(this._bookedSessionsCollection, res[0].id).then(() => {
                        resolve(true);
                    }).catch(() => {
                        reject(false);
                    });
                }
            });
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SessionService, deps: [{ token: CrudService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SessionService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SessionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: CrudService }]; } });

class AdminAuthService {
    constructor(crudServices) {
        this.crudServices = crudServices;
        this.adminCollectionName = 'admin';
    }
    get windowRef() {
        return window;
    }
    verifyUserToLogin(phoneNumber) {
        console.log(phoneNumber);
        return new Promise((resolve, reject) => {
            this.crudServices.getSingleDocByField(this.adminCollectionName, 'phone', phoneNumber).subscribe({
                next: (res) => {
                    console.log('verify res', res);
                    const userData = res.docs.map((ele) => {
                        return {
                            id: ele.id,
                            ...ele.data()
                        };
                    });
                    console.log('userData', userData);
                    if (userData.length > 0) {
                        this.admin = userData[0];
                        resolve(userData[0]);
                    }
                    resolve(false);
                },
                error: (err) => {
                    reject(err);
                }
            });
        });
    }
    completeLogin() {
        this.admin.updatedAt = new Date(`${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`).getTime();
        this.crudServices.updateData(this.adminCollectionName, this.admin.id, this.admin);
        localStorage.setItem('id', this.admin.id);
        return true;
    }
    logOut() {
        localStorage.removeItem('id');
        return true;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AdminAuthService, deps: [{ token: CrudService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AdminAuthService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AdminAuthService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: CrudService }]; } });

/*
 * Public API Surface of dal
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AdminAuthService, AuthService, CareerPathService, CoursesService, CrudService, DALComponent, DALModule, DALService, LearnService, LectureType, MentorService, PackagePricingService, PackagesService, PaymentService, S3ImgUploaderService, SessionService, SsType, UsersService, WeekDays, environment };
//# sourceMappingURL=dal.mjs.map
