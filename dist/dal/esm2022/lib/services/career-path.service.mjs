import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "./crud.service";
export class CareerPathService {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: CareerPathService, deps: [{ token: i1.CrudService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: CareerPathService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: CareerPathService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CrudService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZWVyLXBhdGguc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2RhbC9zcmMvbGliL3NlcnZpY2VzL2NhcmVlci1wYXRoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQWMsR0FBRyxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7QUFNdkMsTUFBTSxPQUFPLGlCQUFpQjtJQUU1QixZQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQURwQywwQkFBcUIsR0FBRyxhQUFhLENBQUM7SUFDQyxDQUFDO0lBRWhELHlCQUF5QjtJQUV6QixpQkFBaUI7UUFDZixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLElBQUksQ0FDOUQsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDZixPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDOUIsT0FBVztvQkFDVCxFQUFFLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDMUIsR0FBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQWE7aUJBQzFDLENBQUM7WUFDSixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQsS0FBSyxDQUFDLGdCQUFnQixDQUFDLEtBQWEsRUFBRSxXQUFtQjtRQUN2RCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxXQUFXO2lCQUNiLE9BQU8sQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUU7Z0JBQ25DLEtBQUs7Z0JBQ0wsV0FB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YmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDcnVkU2VydmljZSB9IGZyb20gJy4vY3J1ZC5zZXJ2aWNlJztcbmltcG9ydCB7IENwIH0gZnJvbSAnLi4vbW9kZWxzL2NvbnRlbnQvY3AnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgbWFwIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDb3Vyc2UgfSBmcm9tICcuLi9tb2RlbHMvY29udGVudC9jb3Vyc2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ2FyZWVyUGF0aFNlcnZpY2Uge1xuICBwcml2YXRlIF9jYXJlZXJQYXRoQ29sbGVjdGlvbiA9ICdjYXJlZXItcGF0aCc7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY3J1ZFNlcnZpY2U6IENydWRTZXJ2aWNlKSB7fVxuXG4gIC8vIENhcmVlciBQYXRoIENvbGxlY3Rpb25cblxuICBnZXRBbGxDYXJlZXJQYXRocygpOiBPYnNlcnZhYmxlPENwW10+IHtcbiAgICByZXR1cm4gdGhpcy5jcnVkU2VydmljZS5nZXREYXRhKHRoaXMuX2NhcmVlclBhdGhDb2xsZWN0aW9uKS5waXBlKFxuICAgICAgbWFwKChkb2NTbmFwcykgPT4ge1xuICAgICAgICByZXR1cm4gZG9jU25hcHMubWFwKChkb2NTbmFwKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIDxDcD57XG4gICAgICAgICAgICBpZDogZG9jU25hcC5wYXlsb2FkLmRvYy5pZCxcbiAgICAgICAgICAgIC4uLihkb2NTbmFwLnBheWxvYWQuZG9jLmRhdGEoKSBhcyBvYmplY3QpLFxuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgYXN5bmMgYWRkTmV3Q2FyZWVyUGF0aCh0aXRsZTogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuY3J1ZFNlcnZpY2VcbiAgICAgICAgLmFkZERhdGEodGhpcy5fY2FyZWVyUGF0aENvbGxlY3Rpb24sIHtcbiAgICAgICAgICB0aXRsZSxcbiAgICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpKVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiByZWplY3QoZXJyb3IpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGFkZENvdXJzZVRvQ2FyZWVyUGF0aChjb3Vyc2U6IENvdXJzZSwgY2FyZWVyUGF0aElEOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5jcnVkU2VydmljZVxuICAgICAgICAuc2V0U2luZ2xlRG9jKFxuICAgICAgICAgIGAke3RoaXMuX2NhcmVlclBhdGhDb2xsZWN0aW9ufS8ke2NhcmVlclBhdGhJRH0vY291cnNlc2AsXG4gICAgICAgICAgY291cnNlLmlkLFxuICAgICAgICAgIGNvdXJzZVxuICAgICAgICApXG4gICAgICAgIC50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSlcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gcmVqZWN0KGVycm9yKSk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyB1cGRhdGVDYXJlZXJQYXRoKElEOiBhbnksIHRpdGxlOiBzdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5jcnVkU2VydmljZVxuICAgICAgICAudXBkYXRlRGF0YSh0aGlzLl9jYXJlZXJQYXRoQ29sbGVjdGlvbiwgSUQsIHtcbiAgICAgICAgICB0aXRsZSxcbiAgICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzb2x2ZShyZXMpKVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiByZWplY3QoZXJyb3IpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGRlbGV0ZUNhcmVlclBhdGgoY3BJRDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuY3J1ZFNlcnZpY2VcbiAgICAgICAgLmRlbGV0ZURhdGEodGhpcy5fY2FyZWVyUGF0aENvbGxlY3Rpb24sIGNwSUQpXG4gICAgICAgIC50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSlcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gcmVqZWN0KGVycm9yKSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBDb3Vyc2VzIFN1YkNvbGxlY3Rpb25cblxuICBnZXRBbGxDYXJlZXJDb3Vyc2VzKGNhcmVlcklEOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5jcnVkU2VydmljZVxuICAgICAgLmdldERhdGEoYC8ke3RoaXMuX2NhcmVlclBhdGhDb2xsZWN0aW9ufS8ke2NhcmVlcklEfS9jb3Vyc2VzYClcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKGNhcmVlckRvY1NuYXBzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNhcmVlckRvY1NuYXBzLm1hcCgoY2FyZWVyRG9jKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gPENvdXJzZT57XG4gICAgICAgICAgICAgIGlkOiBjYXJlZXJEb2MucGF5bG9hZC5kb2MuaWQsXG4gICAgICAgICAgICAgIC4uLihjYXJlZXJEb2MucGF5bG9hZC5kb2MuZGF0YSgpIGFzIG9iamVjdCksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxufVxuIl19