import { map } from 'rxjs';
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./crud.service";
import * as i2 from "./auth.service";
export class UsersService {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UsersService, deps: [{ token: i1.CrudService }, { token: i2.AuthService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UsersService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: UsersService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CrudService }, { type: i2.AuthService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2RhbC9zcmMvbGliL3NlcnZpY2VzL3VzZXJzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFjLEdBQUcsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUt2QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBUzNDLE1BQU0sT0FBTyxZQUFZO0lBUXZCLFlBQ1UsV0FBd0IsRUFDeEIsV0FBd0I7UUFEeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFUMUIscUJBQWdCLEdBQUcsT0FBTyxDQUFDO1FBQzNCLHVCQUFrQixHQUFHLFNBQVMsQ0FBQztRQUMvQiw4QkFBeUIsR0FBRyxpQkFBaUIsQ0FBQztRQUM5Qyx3QkFBbUIsR0FBRyxVQUFVLENBQUM7SUFPdEMsQ0FBQztJQUVKLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBWSxFQUFFLE9BQWUsRUFBRSxXQUFtQjtRQUNwRSxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxXQUFXO2lCQUNiLFlBQVksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ3ZDLEVBQUUsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUc7Z0JBQ3BCLEtBQUssRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUs7Z0JBQ3pCLFdBQVcsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVc7Z0JBQ3JDLFFBQVEsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVE7Z0JBQy9CLFVBQVUsRUFBRSxLQUFLO2dCQUNqQixLQUFLLEVBQUUsS0FBSztnQkFDWixNQUFNLEVBQUUsS0FBSztnQkFDYixTQUFTLEVBQUUs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QUM7SUFDTixDQUFDO0lBRUQsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFjLEVBQUUsT0FBb0I7UUFDdEQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxJQUFJLENBQUMsV0FBVztpQkFDYixPQUFPLENBQ04sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLElBQUksTUFBTSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUNoRSxPQUFPLENBQ1I7aUJBQ0EsSUFBSSxDQUFDLE9BQU8sQ0FBQztpQkFDYixLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsZ0JBQWdCO0lBQ2hCLEtBQUssQ0FBQyxjQUFjLENBQUMsTUFBYyxFQUFFLE9BQVk7UUFDL0MsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxJQUFJLENBQUMsV0FBVztpQkFDYixVQUFVLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUM7aUJBQ2xELElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUMzQixLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzsrR0EzTlUsWUFBWTttSEFBWixZQUFZLGNBRlgsTUFBTTs7NEZBRVAsWUFBWTtrQkFIeEIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBtYXAgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENydWRTZXJ2aWNlIH0gZnJvbSAnLi9jcnVkLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL21vZGVscy91c2VyL3VzZXInO1xuaW1wb3J0IHsgQ291cnNlTGV2ZWwgfSBmcm9tICcuLi9tb2RlbHMvdXNlci9jb3Vyc2VMZXZlbCc7XG5pbXBvcnQgeyBDb3Vyc2UgfSBmcm9tICcuLi9tb2RlbHMvY29udGVudC9jb3Vyc2UnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBCb29rZWRTZXNzaW9uIH0gZnJvbSAnLi4vbW9kZWxzL3Nlc3Npb24vYm9va2VkU2Vzc2lvbic7XG5pbXBvcnQgeyBVc2VyUHJvamVjdCB9IGZyb20gJy4uL21vZGVscy91c2VyL3VzZXJQcm9qZWN0JztcbmltcG9ydCB7IENvbm5lY3RlZEFjY291bnRzIH0gZnJvbSAnLi4vbW9kZWxzL3VzZXIvY29ubmVjdGVkQWNjb3VudHMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgVXNlcnNTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfdXNlcnNDb2xsZWN0aW9uID0gJ3VzZXJzJztcbiAgcHJpdmF0ZSBfY291cnNlc0NvbGxlY3Rpb24gPSAnY291cnNlcyc7XG4gIHByaXZhdGUgX2Jvb2tlZFNlc3Npb25zQ29sbGVjdGlvbiA9ICdib29rZWQtc2Vzc2lvbnMnO1xuICBwcml2YXRlIF9wcm9qZWN0c0NvbGxlY3Rpb24gPSAncHJvamVjdHMnO1xuXG4gIHVzZXJEb2M6IE9ic2VydmFibGU8VXNlcj4gfCBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY3J1ZFNlcnZpY2U6IENydWRTZXJ2aWNlLFxuICAgIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlXG4gICkge31cblxuICBhc3luYyBjcmVhdGVVc2VyRG9jKG5ld1VzZXI6IGFueSwgY291bnRyeTogc3RyaW5nLCBjb3VudHJ5Q29kZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuY3J1ZFNlcnZpY2VcbiAgICAgICAgLnNldFNpbmdsZURvYygndXNlcnMnLCBuZXdVc2VyLnVzZXIudWlkLCB7XG4gICAgICAgICAgaWQ6IG5ld1VzZXIudXNlci51aWQsXG4gICAgICAgICAgZW1haWw6IG5ld1VzZXIudXNlci5lbWFpbCxcbiAgICAgICAgICBkaXNwbGF5TmFtZTogbmV3VXNlci51c2VyLmRpc3BsYXlOYW1lLFxuICAgICAgICAgIHBob3RvVVJMOiBuZXdVc2VyLnVzZXIucGhvdG9VUkwsXG4gICAgICAgICAgaXNWZXJpZmllZDogZmFsc2UsXG4gICAgICAgICAgaXNQcm86IGZhbHNlLFxuICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICAgICAgbGFzdExvZ2luOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKSxcbiAgICAgICAgICB1cGRhdGVkQXQ6IG5ldyBEYXRlKCksXG4gICAgICAgICAgbWF4U3RyZWFrOiAwLFxuICAgICAgICAgIGN1cnJlbnRTdHJlYWs6IDAsXG4gICAgICAgICAgc3RyZWFrRGF5czogW10sXG4gICAgICAgICAgZGVsZXRlZEF0OiBudWxsLFxuICAgICAgICAgIGRlbGV0ZWQ6IGZhbHNlLFxuICAgICAgICAgIGNvdXJzZUxpc3Q6IFtdLFxuICAgICAgICAgIGxpbmtlZEluOiAnJyxcbiAgICAgICAgICBnaXRIdWI6ICcnLFxuICAgICAgICAgIGJpbzogJycsXG4gICAgICAgICAgY291bnRyeUNvZGUsXG4gICAgICAgICAgY291bnRyeSxcbiAgICAgICAgICBwYWlkOiB0cnVlLFxuICAgICAgICAgIHNlc3Npb25FeHBpcmF0aW9uRGF0ZTogbnVsbCxcbiAgICAgICAgICAvLyBhdmFpbGFibGVTZXNzaW9uczogbnVsbCxcbiAgICAgICAgfSBhcyBVc2VyKVxuICAgICAgICAudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcykpXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHJlamVjdChlcnJvcikpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0VXNlcigpIHtcbiAgICB0aGlzLmF1dGhTZXJ2aWNlLnVzZXIuc3Vic2NyaWJlKCh1c2VyQXV0aE9iaikgPT4ge1xuICAgICAgaWYgKHVzZXJBdXRoT2JqID09IG51bGwpIHtcbiAgICAgICAgdGhpcy51c2VyRG9jID0gbnVsbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudXNlckRvYyA9IHRoaXMuZ2V0QWN0aXZlVXNlcih1c2VyQXV0aE9iai51aWQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0QWxsVXNlcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuY3J1ZFNlcnZpY2UuZ2V0RGF0YSh0aGlzLl91c2Vyc0NvbGxlY3Rpb24pLnBpcGUoXG4gICAgICBtYXAoKGRvY1NuYXBzKSA9PiB7XG4gICAgICAgIHJldHVybiBkb2NTbmFwcy5tYXAoKGRvY1NuYXApID0+IHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6IGRvY1NuYXAucGF5bG9hZC5kb2MuaWQsXG4gICAgICAgICAgICAuLi4oZG9jU25hcC5wYXlsb2FkLmRvYy5kYXRhKCkgYXMgb2JqZWN0KSxcbiAgICAgICAgICB9IGFzIFVzZXI7XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgZ2V0QWN0aXZlVXNlcih1c2VySUQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmNydWRTZXJ2aWNlXG4gICAgICAuZ2V0U2lnbmxlRG9jU25hcCh0aGlzLl91c2Vyc0NvbGxlY3Rpb24sIHVzZXJJRClcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKHVzZXJEb2NTbmFwKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIDxVc2VyPntcbiAgICAgICAgICAgIGlkOiB1c2VyRG9jU25hcC5wYXlsb2FkLmlkLFxuICAgICAgICAgICAgLi4uKHVzZXJEb2NTbmFwLnBheWxvYWQuZGF0YSgpIGFzIG9iamVjdCksXG4gICAgICAgICAgfTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICBnZXRTaW5nbGVVc2VyKHVzZXJJRDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuY3J1ZFNlcnZpY2UuZ2V0U2lnbmxlRG9jKHRoaXMuX3VzZXJzQ29sbGVjdGlvbiwgdXNlcklEKS5waXBlKFxuICAgICAgbWFwKCh1c2VyRG9jU25hcCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygndXNlckRvY1NuYXAnLCB1c2VyRG9jU25hcCk7XG5cbiAgICAgICAgcmV0dXJuIDxVc2VyPntcbiAgICAgICAgICBpZDogdXNlckRvY1NuYXAuaWQsXG4gICAgICAgICAgaXNFeGlzdDogdXNlckRvY1NuYXAuZXhpc3RzLFxuICAgICAgICAgIC4uLih1c2VyRG9jU25hcC5kYXRhKCkgYXMgb2JqZWN0KSxcbiAgICAgICAgfTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuICAvLyBnZXQgZGF0YSBjb3Vyc3JzXG4gIGdldFVzZXJDb3Vyc2VzKHVzZXJJRDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuY3J1ZFNlcnZpY2VcbiAgICAgIC5nZXRTdWJDb2xsZWN0aW9uRGF0YShcbiAgICAgICAgYC8ke3RoaXMuX3VzZXJzQ29sbGVjdGlvbn0vJHt1c2VySUR9LyR7dGhpcy5fY291cnNlc0NvbGxlY3Rpb259YFxuICAgICAgKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoY291cnNlRG9jU2FucHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY291cnNlRG9jU2FucHMuZG9jcy5tYXAoKGNvdXJzZURvY1NuYXApID0+IHtcbiAgICAgICAgICAgIHJldHVybiA8Q291cnNlPntcbiAgICAgICAgICAgICAgaWQ6IGNvdXJzZURvY1NuYXAuaWQsXG4gICAgICAgICAgICAgIC4uLihjb3Vyc2VEb2NTbmFwLmRhdGEoKSBhcyBvYmplY3QpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICAvL0Vucm9sbCBVc2VyIGluIENvdXJzZVxuICBhc3luYyBlbnJvbGxJbkNvdXJzZSh1c2VySUQ6IHN0cmluZywgY291cnNlSUQ6IHN0cmluZywgZGF0YTogQ291cnNlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuY3J1ZFNlcnZpY2VcbiAgICAgICAgLnNldFNpbmdsZURvYyhcbiAgICAgICAgICBgJHt0aGlzLl91c2Vyc0NvbGxlY3Rpb259LyR7dXNlcklEfS8ke3RoaXMuX2NvdXJzZXNDb2xsZWN0aW9ufWAsXG4gICAgICAgICAgY291cnNlSUQsXG4gICAgICAgICAgZGF0YVxuICAgICAgICApXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzb2x2ZShyZXNwb25zZSkpXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHJlamVjdChlcnJvcikpO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgYWRkQ291cnNlTGV2ZWxUb1VzZXJEb2ModXNlcklEOiBzdHJpbmcsIGNvdXJzZUxldmVsOiBDb3Vyc2VMZXZlbFtdKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuY3J1ZFNlcnZpY2VcbiAgICAgICAgLnVwZGF0ZURhdGEoJ3VzZXJzJywgdXNlcklELCB7IGNvdXJzZUxpc3Q6IGNvdXJzZUxldmVsIH0pXG4gICAgICAgIC50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSlcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gcmVqZWN0KGVycm9yKSk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyB1cGRhdGVVc2VyU3RlYXJrRGF5cyhcbiAgICB1c2VySUQ6IHN0cmluZyxcbiAgICBzdHJlYWtEYXlzOiBEYXRlW10sXG4gICAgbWF4U3RyZWFrOiBudW1iZXIsXG4gICAgY3VycmVudFN0cmVhazogbnVtYmVyXG4gICkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmNydWRTZXJ2aWNlXG4gICAgICAgIC51cGRhdGVEYXRhKCd1c2VycycsIHVzZXJJRCwge1xuICAgICAgICAgIHN0cmVha0RheXMsXG4gICAgICAgICAgbWF4U3RyZWFrLFxuICAgICAgICAgIGN1cnJlbnRTdHJlYWssXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc29sdmUpXG4gICAgICAgIC5jYXRjaChyZWplY3QpO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgdXBkYXRlVXNlckRvYyh1c2VyOiBVc2VyKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuY3J1ZFNlcnZpY2VcbiAgICAgICAgLnVwZGF0ZURhdGEoJ3VzZXJzJywgdXNlci5pZCwgdXNlcilcbiAgICAgICAgLnRoZW4ocmVzb2x2ZSlcbiAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBUYXJlQ3VycmVudFN0cmVhayh1c2VySUQ6IHN0cmluZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmNydWRTZXJ2aWNlXG4gICAgICAgIC51cGRhdGVEYXRhKCd1c2VycycsIHVzZXJJRCwgeyBjdXJyZW50U3RyZWFrOiAwIH0pXG4gICAgICAgIC50aGVuKHJlc29sdmUpXG4gICAgICAgIC5jYXRjaChyZWplY3QpO1xuICAgIH0pO1xuICB9XG4gIC8vQm9va3MgU2Vzc2lvbnM6XG4gIGFzeW5jIGJvb2tTZXNzaW9uKHNlc3Npb246IEJvb2tlZFNlc3Npb24pIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5jcnVkU2VydmljZVxuICAgICAgICAuYWRkRGF0YSh0aGlzLl9ib29rZWRTZXNzaW9uc0NvbGxlY3Rpb24sIHNlc3Npb24pXG4gICAgICAgIC50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSlcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gcmVqZWN0KGVycm9yKSk7XG4gICAgfSk7XG4gIH1cbiAgLy9Qcm9qZWN0c1xuXG4gIGdldFVzZXJQcm9qZWN0cyh1c2VySUQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmNydWRTZXJ2aWNlXG4gICAgICAuZ2V0RGF0YShcbiAgICAgICAgYC8ke3RoaXMuX3VzZXJzQ29sbGVjdGlvbn0vJHt1c2VySUR9LyR7dGhpcy5fcHJvamVjdHNDb2xsZWN0aW9ufWBcbiAgICAgIClcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKHVzZXJQcm9qZWN0c0RvY3MpID0+IHtcbiAgICAgICAgICByZXR1cm4gdXNlclByb2plY3RzRG9jcy5tYXAoKHByb2plY3QpID0+IHtcbiAgICAgICAgICAgIHJldHVybiA8VXNlclByb2plY3Q+e1xuICAgICAgICAgICAgICBpZDogcHJvamVjdC5wYXlsb2FkLmRvYy5pZCxcbiAgICAgICAgICAgICAgLi4uKHByb2plY3QucGF5bG9hZC5kb2MuZGF0YSgpIGFzIG9iamVjdCksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIGFzeW5jIHN1Ym1pdFByb2plY3QodXNlcklEOiBzdHJpbmcsIHByb2plY3Q6IFVzZXJQcm9qZWN0KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuY3J1ZFNlcnZpY2VcbiAgICAgICAgLmFkZERhdGEoXG4gICAgICAgICAgYCR7dGhpcy5fdXNlcnNDb2xsZWN0aW9ufS8ke3VzZXJJRH0vJHt0aGlzLl9wcm9qZWN0c0NvbGxlY3Rpb259YCxcbiAgICAgICAgICBwcm9qZWN0XG4gICAgICAgIClcbiAgICAgICAgLnRoZW4ocmVzb2x2ZSlcbiAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgfSk7XG4gIH1cbiAgLy91c2VyIHNldHR0aW5nc1xuICBhc3luYyBhZGRVc2VyU29jaWFscyh1c2VySUQ6IHN0cmluZywgc29jaWFsczogYW55KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuY3J1ZFNlcnZpY2VcbiAgICAgICAgLnVwZGF0ZURhdGEodGhpcy5fdXNlcnNDb2xsZWN0aW9uLCB1c2VySUQsIHNvY2lhbHMpXG4gICAgICAgIC50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSlcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gcmVqZWN0KGVycm9yKSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==