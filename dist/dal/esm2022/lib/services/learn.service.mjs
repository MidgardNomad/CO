import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "./crud.service";
export class LearnService {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LearnService, deps: [{ token: i1.CrudService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LearnService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LearnService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CrudService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVhcm4uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2RhbC9zcmMvbGliL3NlcnZpY2VzL2xlYXJuLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7QUFNM0IsTUFBTSxPQUFPLFlBQVk7SUFDdkIsWUFBb0IsV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFFcEMsdUJBQWtCLEdBQUcsU0FBUyxDQUFDO1FBQy9CLHdCQUFtQixHQUFHLFVBQVUsQ0FBQztRQUNqQyx3QkFBbUIsR0FBRyxVQUFVLENBQUM7SUFKTSxDQUFDO0lBTWhELG9CQUFvQixDQUFDLFFBQWdCLEVBQUUsU0FBaUIsRUFBRSxTQUFpQjtRQUN6RSxPQUFPLElBQUksQ0FBQyxXQUFXO2FBQ3BCLGFBQWEsQ0FDWixJQUFJLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDLG1CQUFtQixJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFDOUcsU0FBUyxDQUNWO2FBQ0EsSUFBSSxDQUNILEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ2QsT0FBZ0I7Z0JBQ2QsRUFBRSxFQUFFLE9BQU8sQ0FBQyxFQUFFO2dCQUNkLEdBQUksT0FBTyxDQUFDLElBQUksRUFBYTthQUM5QixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNOLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxRQUFnQixFQUFFLFNBQWlCLEVBQUUsS0FBYTtRQUNqRSxPQUFPLElBQUksQ0FBQyxXQUFXO2FBQ3BCLG1CQUFtQixDQUNsQixJQUFJLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDLG1CQUFtQixJ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bnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ3J1ZFNlcnZpY2UgfSBmcm9tICcuL2NydWQuc2VydmljZSc7XG5pbXBvcnQgeyBMZWN0dXJlIH0gZnJvbSAnLi4vbW9kZWxzL2NvbnRlbnQvbGVjdHVyZSc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENoYXB0ZXIgfSBmcm9tICcuLi9tb2RlbHMvY29udGVudC9jaGFwdGVyJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIExlYXJuU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY3J1ZFNlcnZpY2U6IENydWRTZXJ2aWNlKSB7fVxuXG4gIHByaXZhdGUgX2NvdXJzZXNDb2xsZWN0aW9uID0gJ2NvdXJzZXMnO1xuICBwcml2YXRlIF9jaGFwdGVyc0NvbGxlY3Rpb24gPSAnY2hhcHRlcnMnO1xuICBwcml2YXRlIF9sZWN0dXJlc0NvbGxlY3Rpb24gPSAnbGVjdHVyZXMnO1xuXG4gIGdldFNpbmdsZUxlY3R1cmVCeUlEKGNvdXJzZUlEOiBzdHJpbmcsIGNoYXB0ZXJJRDogc3RyaW5nLCBsZWN0dXJlSWQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmNydWRTZXJ2aWNlXG4gICAgICAuZ2V0U2luZ2xlRGF0YShcbiAgICAgICAgYC8ke3RoaXMuX2NvdXJzZXNDb2xsZWN0aW9ufS8ke2NvdXJzZUlEfS8ke3RoaXMuX2NoYXB0ZXJzQ29sbGVjdGlvbn0vJHtjaGFwdGVySUR9LyR7dGhpcy5fbGVjdHVyZXNDb2xsZWN0aW9ufWAsXG4gICAgICAgIGxlY3R1cmVJZFxuICAgICAgKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoZG9jU25hcCkgPT4ge1xuICAgICAgICAgIHJldHVybiA8TGVjdHVyZT57XG4gICAgICAgICAgICBpZDogZG9jU25hcC5pZCxcbiAgICAgICAgICAgIC4uLihkb2NTbmFwLmRhdGEoKSBhcyBvYmplY3QpLFxuICAgICAgICAgIH07XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgZ2V0TmV4dExlY3R1cmVJRChjb3Vyc2VJRDogc3RyaW5nLCBjaGFwdGVySUQ6IHN0cmluZywgc2VxTm86IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLmNydWRTZXJ2aWNlXG4gICAgICAuZ2V0U2luZ2xlRG9jQnlGaWVsZChcbiAgICAgICAgYC8ke3RoaXMuX2NvdXJzZXNDb2xsZWN0aW9ufS8ke2NvdXJzZUlEfS8ke3RoaXMuX2NoYXB0ZXJzQ29sbGVjdGlvbn0vJHtjaGFwdGVySUR9LyR7dGhpcy5fbGVjdHVyZXNDb2xsZWN0aW9ufWAsXG4gICAgICAgICdzZXFObycsXG4gICAgICAgIHNlcU5vXG4gICAgICApXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChsZWN0dXJlcykgPT4ge1xuICAgICAgICAgIHJldHVybiBsZWN0dXJlcy5kb2NzLm1hcCgobGVjdHVyZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGxlY3R1cmUuaWQ7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgZ2V0Rmlyc3RMZWN0dXJlSURPZkNoYXB0ZXIoY291cnNlSWQ6IHN0cmluZywgY2hhcHRlcklkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5jcnVkU2VydmljZVxuICAgICAgLmdldFNpbmdsZURhdGFCeUZpZWxkKFxuICAgICAgICBgLyR7dGhpcy5fY291cnNlc0NvbGxlY3Rpb259LyR7Y291cnNlSWR9LyR7dGhpcy5fY2hhcHRlcnNDb2xsZWN0aW9ufS8ke2NoYXB0ZXJJZH0vJHt0aGlzLl9sZWN0dXJlc0NvbGxlY3Rpb259YCxcbiAgICAgICAgJ3NlcU5vJyxcbiAgICAgICAgMVxuICAgICAgKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgobGVjdHVyZURvY3MpID0+IHtcbiAgICAgICAgICByZXR1cm4gbGVjdHVyZURvY3MubWFwKChsZWN0dXJlRG9jKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbGVjdHVyZURvYy5wYXlsb2FkLmRvYy5pZDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICAvL0NoYXB0ZXJzXG4gIGdldFNpZ2xlQ2hhcHRlcihjb3Vyc2VJRDogc3RyaW5nLCBjaGFwdGVySUQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmNydWRTZXJ2aWNlXG4gICAgICAuZ2V0U2luZ2xlRGF0YShcbiAgICAgICAgYC8ke3RoaXMuX2NvdXJzZXNDb2xsZWN0aW9ufS8ke2NvdXJzZUlEfS8ke3RoaXMuX2NoYXB0ZXJzQ29sbGVjdGlvbn0vYCxcbiAgICAgICAgY2hhcHRlcklEXG4gICAgICApXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChjaGFwdGVyRG9jKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIDxDaGFwdGVyPntcbiAgICAgICAgICAgIGlkOiBjaGFwdGVyRG9jLmlkLFxuICAgICAgICAgICAgLi4uKGNoYXB0ZXJEb2MuZGF0YSgpIGFzIG9iamVjdCksXG4gICAgICAgICAgfTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICBnZXROZXh0Q2hhcHRlcklEKGNvdXJzZUlEOiBzdHJpbmcsIHNlcU5vOiBudW1iZXIpIHtcbiAgICByZXR1cm4gdGhpcy5jcnVkU2VydmljZVxuICAgICAgLmdldFNpbmdsZURvY0J5RmllbGQoXG4gICAgICAgIGAke3RoaXMuX2NvdXJzZXNDb2xsZWN0aW9ufS8ke2NvdXJzZUlEfS8ke3RoaXMuX2NoYXB0ZXJzQ29sbGVjdGlvbn1gLFxuICAgICAgICAnc2VxTm8nLFxuICAgICAgICBzZXFOb1xuICAgICAgKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoY2hhcHRlckRvYykgPT4ge1xuICAgICAgICAgIGlmIChjaGFwdGVyRG9jLmRvY3NbMF0/LmV4aXN0cykge1xuICAgICAgICAgICAgcmV0dXJuIGNoYXB0ZXJEb2MuZG9jc1swXS5pZDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIC8vQ291cnNlc1xuXG4gIGdldE5leHRDb3Vyc2VJRChzZXFObzogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHRoaXMuY3J1ZFNlcnZpY2VcbiAgICAgIC5nZXRTaW5nbGVEYXRhQnlGaWVsZCh0aGlzLl9jb3Vyc2VzQ29sbGVjdGlvbiwgJ3NlcU5vJywgc2VxTm8pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChjb3Vyc2VEb2NzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvdXJzZURvY3MubWFwKChjb3Vyc2VEb2MpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjb3Vyc2VEb2MucGF5bG9hZC5kb2MuaWQ7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG59XG4iXX0=