import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "./crud.service";
export class MentorService {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: MentorService, deps: [{ token: i1.CrudService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: MentorService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: MentorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CrudService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9kYWwvc3JjL2xpYi9zZXJ2aWNlcy9tZW50b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxNQUFNLENBQUM7OztBQUszQixNQUFNLE9BQU8sYUFBYTtJQUt4QixZQUFvQixLQUFrQjtRQUFsQixVQUFLLEdBQUwsS0FBSyxDQUFhO1FBSjlCLHVCQUFrQixHQUFHLFNBQVMsQ0FBQztRQUMvQix3QkFBbUIsR0FBRyxVQUFVLENBQUM7UUFDakMsb0JBQWUsR0FBRyxpQkFBaUIsQ0FBQztJQUVILENBQUM7SUFFMUMsVUFBVTtRQUNSLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsSUFBSSxDQUN4RCxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtZQUNsQixPQUFPLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7Z0JBQ3hDLE9BQWU7b0JBQ2IsRUFBRSxFQUFFLFNBQVMsQ0FBQyxFQUFFO29CQUNoQixHQUFJLFNBQVMsQ0FBQyxJQUFJLEVBQWE7aUJBQ2hDLENBQUM7WUFDSixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQsYUFBYSxDQUFDLFFBQWdCO1FBQzVCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FDckUsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDbEIsT0FBZTtnQkFDYixFQUFFLEVBQUUsV0FBVyxDQUFDLEVB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QUh6QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1lbnRvciwgc2Vzc2lvbkZvcm0sIFdlZWtEYXlzIH0gZnJvbSAnLi4vbW9kZWxzL21lbnRvci9tZW50b3InO1xuaW1wb3J0IHsgQ3J1ZFNlcnZpY2UgfSBmcm9tICcuL2NydWQuc2VydmljZSc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE1lbnRvclNlcnZpY2Uge1xuICBwcml2YXRlIF9tZW50b3JzQ29sbGVjdGlvbiA9ICdtZW50b3JzJztcbiAgcHJpdmF0ZSBfc2Vzc2lvbnNDb2xsZWN0aW9uID0gJ3Nlc3Npb25zJztcbiAgcHJpdmF0ZSBfYm9va2VkU2Vzc2lvbnMgPSAnYm9va2VkLXNlc3Npb25zJztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jcnVkOiBDcnVkU2VydmljZSkge31cblxuICBnZXRNZW50b3JzKCkge1xuICAgIHJldHVybiB0aGlzLl9jcnVkLmdldEFsbERhdGEodGhpcy5fbWVudG9yc0NvbGxlY3Rpb24pLnBpcGUoXG4gICAgICBtYXAoKG1lbnRvcnNMaXN0KSA9PiB7XG4gICAgICAgIHJldHVybiBtZW50b3JzTGlzdC5kb2NzLm1hcCgobWVudG9yRG9jKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIDxNZW50b3I+e1xuICAgICAgICAgICAgaWQ6IG1lbnRvckRvYy5pZCxcbiAgICAgICAgICAgIC4uLihtZW50b3JEb2MuZGF0YSgpIGFzIG9iamVjdCksXG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBnZXRNZW50b3JCeUlEKG1lbnRvcklEOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fY3J1ZC5nZXRTaW5nbGVEYXRhKHRoaXMuX21lbnRvcnNDb2xsZWN0aW9uLCBtZW50b3JJRCkucGlwZShcbiAgICAgIG1hcCgobWVudG9yRkJEb2MpID0+IHtcbiAgICAgICAgcmV0dXJuIDxNZW50b3I+e1xuICAgICAgICAgIGlkOiBtZW50b3JGQkRvYy5pZCxcbiAgICAgICAgICAuLi4obWVudG9yRkJEb2MuZGF0YSgpIGFzIG9iamVjdCksXG4gICAgICAgIH07XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBhZGRNZW50b3IobWVudG9yOiBNZW50b3IpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5fY3J1ZFxuICAgICAgICAuYWRkRGF0YSh0aGlzLl9tZW50b3JzQ29sbGVjdGlvbiwgbWVudG9yKVxuICAgICAgICAudGhlbigocmVzKSA9PiByZXNvbHZlKHJlcykpXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHJlamVjdChlcnJvcikpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlTWVudG9yKG1lbnRvcklEOiBzdHJpbmcsIG1lbnRvcjogTWVudG9yKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NydWQudXBkYXRlRGF0YSh0aGlzLl9tZW50b3JzQ29sbGVjdGlvbiwgbWVudG9ySUQsIG1lbnRvcik7XG4gIH1cblxuICBkZWxldGVNZW50b3IobWVudG9ySUQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9jcnVkLmRlbGV0ZURhdGEodGhpcy5fbWVudG9yc0NvbGxlY3Rpb24sIG1lbnRvcklEKTtcbiAgfVxuXG4gIGdldE1lbnRvclNlc3Npb25zKG1lbnRvcklEOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fY3J1ZC5nZXREYXRhQnlPbmVGaWVsZChcbiAgICAgIHRoaXMuX2Jvb2tlZFNlc3Npb25zLFxuICAgICAgJ21lbnRvcklkJyxcbiAgICAgIG1lbnRvcklEXG4gICAgKTtcbiAgfVxuXG4gIGFkZFRvU2Vzc2lvblNjaGVkdWxlKG1lbnRvcklEOiBzdHJpbmcsIHNlc3Npb246IHNlc3Npb25Gb3JtW10pIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5fY3J1ZFxuICAgICAgICAudXBkYXRlRGF0YSh0aGlzLl9tZW50b3JzQ29sbGVjdGlvbiwgbWVudG9ySUQsIHtcbiAgICAgICAgICB3ZWVrbHlTY2hlZHVsZTogc2Vzc2lvbixcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpKVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiByZWplY3QoZXJyb3IpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldE1lbm9yQnlTZXNzaW9uSUQoc2Vzc2lvbklEOnN0cmluZyl7XG4gICAgcmV0dXJuIHRoaXMuX2NydWQuZ2V0U2luZ2xlRG9jQnlGaWVsZCh0aGlzLl9tZW50b3JzQ29sbGVjdGlvbiwnZnJlZURheScsc2Vzc2lvbklEKS5waXBlKG1hcChkYXRhPT5cbiAgICAgIGRhdGEuZG9jcy5tYXAoKHJlczphbnkpPT57XG4gICAgICAgIHJldHVybiB7Li4ucmVzLmRhdGEoKSxpZDpyZXMuaWR9XG4gICAgICB9KVxuICAgICkpXG4gIH1cblxuICBnZXRBbGxTdHVkZW50UmVzZXJ2ZWRTZXNzaW9uKGRheTpzdHJpbmcsZGF0ZTpzdHJpbmcpe1xuICAgIHJldHVybiB0aGlzLl9jcnVkLmdldERvY0J5VHdvRmllbGQodGhpcy5fYm9va2VkU2Vzc2lvbnMsJ3Nlc3Npb25EYXknLGRheSwnc2Vzc2lvbkRhdGUnLGRhdGUpO1xuICB9XG4gIC8vIEVkaXQgSW1hZ2UgRm9yIFByb2ZpbGUgTWVudG9yXG4gIHVwZGF0ZU1lbnRvclByb2ZpbGVQaWN0dXJlKG1lbnRvcklEOiBzdHJpbmcsIHByb2ZpbGVQaWN0dXJlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fY3J1ZC51cGRhdGVEYXRhKHRoaXMuX21lbnRvcnNDb2xsZWN0aW9uLCBtZW50b3JJRCwge1xuICAgICAgcHJvZmlsZVBpY3R1cmUsXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==