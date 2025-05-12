import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/fire/compat/firestore";
export class DALService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFsLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9kYWwvc3JjL2xpYi9kYWwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFPM0MsTUFBTSxPQUFPLFVBQVU7SUFFckIsWUFBb0IsU0FBMkI7UUFBM0IsY0FBUyxHQUFULFNBQVMsQ0FBa0I7SUFBSSxDQUFDO0lBRXBELE9BQU87UUFDTCw0REFBNEQ7UUFDNUQsT0FBTztZQUNMLFdBQVcsRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUU7U0FDekYsQ0FBQTtJQUNILENBQUM7K0dBVFUsVUFBVTttSEFBVixVQUFVLGNBRlQsTUFBTTs7NEZBRVAsVUFBVTtrQkFIdEIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBbmd1bGFyRmlyZXN0b3JlIH0gZnJvbSAnQGFuZ3VsYXIvZmlyZS9jb21wYXQvZmlyZXN0b3JlJztcblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBEQUxTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZpcmVzdG9yZTogQW5ndWxhckZpcmVzdG9yZSkgeyB9XG5cbiAgZ2V0RGF0YSgpIHtcbiAgICAvLyBnZXQgYWRtaW4gY29sbGVjdGlvbnMgYXZhaWxhYmxlIGluIGNhcmVlciBvZmZpY2VyIHByb2plY3RcbiAgICByZXR1cm4ge1xuICAgICAgY29sbGVjdGlvbnM6IFsndXNlcnMnLCAnYWRtaW4nLCAnY2FyZWVyJywgJ3BhdGgnLCAnY291cnNlJywgJ2NsYXNzJywgJ2NvbnRlbnQnLCAncXVpeicsXSxcbiAgICB9XG4gIH1cbn1cblxuXG5cbiJdfQ==