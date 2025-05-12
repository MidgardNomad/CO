import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "./crud.service";
export class SessionService {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SessionService, deps: [{ token: i1.CrudService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SessionService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SessionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CrudService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vzc2lvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZGFsL3NyYy9saWIvc2VydmljZXMvc2Vzc2lvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFNM0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7O0FBTzNCLE1BQU0sT0FBTyxjQUFjO0lBSXpCLFlBQW9CLEtBQWtCO1FBQ3BDLDRCQUE0QjtRQURWLFVBQUssR0FBTCxLQUFLLENBQWE7UUFIOUIsdUJBQWtCLEdBQUcsU0FBUyxDQUFDO1FBQy9CLDhCQUF5QixHQUFHLGlCQUFpQixDQUFDO1FBS3BELHdDQUF3QztRQUV4QywwREFBMEQ7UUFFMUQsd0JBQXdCO1FBRXhCLHdCQUF3QjtRQUN4QiwrREFBK0Q7UUFDL0QscUNBQXFDO1FBQ3JDLHVDQUF1QztRQUN2QyxxQkFBcUI7UUFFckIsZ0RBQWdEO1FBQ2hELG9DQUFvQztRQUNwQyxJQUFJO1FBRUosb0NBQW9DO1FBQ3BDLHlEQUF5RDtRQUV6RCwrQkFBK0I7UUFDL0IsbURBQW1EO1FBRW5ELHFDQUFxQztRQUNyQyxzQ0FBc0M7UUFDdEMsaURBQWlEO1FBRWpELHdDQUF3QztRQUN4Qyw2Q0FBNkM7UUFDN0Msb0RBQW9EO1FBRXBELHNDQUFzQztRQUN0Qyx5Q0FBeUM7UUFDekMsa0RBQWtEO1FBRWxELHdDQUF3QztRQUN4Qyw0Q0FBNEM7UUFDNUMsb0RBQW9EO0lBQ3RELENBQUM7SUFFRCxPQUFPO1FBQ0wsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQ3hDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ1YsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUMzQixPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNyQixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQsY0FBYztRQUNaLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FDeEQsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDZCxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDekIsT0FBZ0I7b0JBQ2QsRUFBRSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ3RCLEdBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFhO2lCQUN0QyxDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxPQUFPLENBQUM7aUJBQzFELElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUMzQixLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGFBQWEsQ0FBQyxNQUFhLEVBQUMsUUFBZSxFQUFDLElBQVc7UUFDckQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsRUFBRTtZQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyx5QkFBeUIsRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxRQUFRLEVBQUMsYUFBYSxFQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUEsRUFBRTtnQkFDbEksT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakIsSUFBSSxHQUFHLEVBQUUsTUFBTSxHQUFDLENBQUMsRUFBRTtvQkFDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLHlCQUF5QixFQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRSxFQUFFO3dCQUN2RSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7b0JBQ2YsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUUsRUFBRTt3QkFDWCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7b0JBQ2YsQ0FBQyxDQUFDLENBQUE7aUJBQ0g7WUFDSCxDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQzsrR0ExRlUsY0FBYzttSEFBZCxjQUFjLGNBRmIsTUFBTTs7NEZBRVAsY0FBYztrQkFIMUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNZW50b3IsIHNlc3Npb25Gb3JtLCBXZWVrRGF5cyB9IGZyb20gJy4uL21vZGVscy9tZW50b3IvbWVudG9yJztcbmltcG9ydCB7IENydWRTZXJ2aWNlIH0gZnJvbSAnLi9jcnVkLnNlcnZpY2UnO1xuXG4vLyBpbXBvcnQgbW9tZW50IHRpbWUgem9uZVxuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudC10aW1lem9uZSc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFNlc3Npb24gfSBmcm9tICcuLi9tb2RlbHMvc2Vzc2lvbi9zZXNzaW9uJztcbmltcG9ydCB7IEJvb2tlZFNlc3Npb24gfSBmcm9tICcuLi8uLi9wdWJsaWMtYXBpJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFNlc3Npb25TZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfbWVudG9yc0NvbGxlY3Rpb24gPSAnbWVudG9ycyc7XG4gIHByaXZhdGUgX2Jvb2tlZFNlc3Npb25zQ29sbGVjdGlvbiA9ICdib29rZWQtc2Vzc2lvbnMnO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NydWQ6IENydWRTZXJ2aWNlKSB7XG4gICAgLy8gZ2V0IHRpbWUgem9uZSBmcm9tIG1vbWVudFxuXG4gICAgLy8gbW9tZW50LnR6LnNldERlZmF1bHQoJ0FmcmljYS9DYWlybycpO1xuXG4gICAgLy8gY29uc29sZS5sb2coJyBjdXJyZW50IHRpbWUgem9uZTogJywgbW9tZW50LnR6Lmd1ZXNzKCkpO1xuXG4gICAgLy8gY29uc3QgdGltZSA9ICcyMDowMCc7XG5cbiAgICAvLyBsZXQgZGF5ID0gbmV3IERhdGUoKTtcbiAgICAvLyBkYXkuc2V0RGF0ZShkYXkuZ2V0RGF0ZSgpICsgKCgwICsgKDcgLSBkYXkuZ2V0RGF5KCkpKSAlIDcpKTtcbiAgICAvLyBkYXkuc2V0SG91cnMoK3RpbWUuc3BsaXQoJzonKVswXSk7XG4gICAgLy8gZGF5LnNldE1pbnV0ZXMoK3RpbWUuc3BsaXQoJzonKVsxXSk7XG4gICAgLy8gZGF5LnNldFNlY29uZHMoMCk7XG5cbiAgICAvLyBpZiAoZGF5LmdldERhdGUoKSA9PT0gbmV3IERhdGUoKS5nZXREYXRlKCkpIHtcbiAgICAvLyAgIGRheS5zZXREYXRlKGRheS5nZXREYXRlKCkgKyA3KTtcbiAgICAvLyB9XG5cbiAgICAvLyAvLyBnZXQgY3VycmVudCB0aW1lIGFuZCB0aW1lIHpvbmVcbiAgICAvLyB2YXIgYSA9IG1vbWVudC50eihcIjIwMjQtMDYtMTMgMTE6NTVcIiwgXCJBZnJpY2EvQ2Fpcm9cIik7XG5cbiAgICAvLyAvLyBnZXQgdGltZSB6b25lIGZyb20gbW9tZW50XG4gICAgLy8gY29uc29sZS5sb2coXCIgY3VycmVudCB0aW1lIHpvbmU6IFwiLCBhLmZvcm1hdCgpKTtcblxuICAgIC8vIC8vIGdldCBxYXRhciB0aW1lIG9mIHRoZSBzYW1lIHRpbWVcbiAgICAvLyB2YXIgYiA9IGEuY2xvbmUoKS50eihcIkFzaWEvUWF0YXJcIik7XG4gICAgLy8gY29uc29sZS5sb2coXCIgcWF0YXIgdGltZSB6b25lOiBcIiwgYi5mb3JtYXQoKSk7XG5cbiAgICAvLyAvLyBnZXQgbWFsYXlzaWEgdGltZSBvZiB0aGUgc2FtZSB0aW1lXG4gICAgLy8gdmFyIGMgPSBhLmNsb25lKCkudHooXCJBc2lhL0t1YWxhX0x1bXB1clwiKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcIiBtYWxheXNpYSB0aW1lIHpvbmU6IFwiLCBjLmZvcm1hdCgpKTtcblxuICAgIC8vIC8vIGdldCBsb25kb24gdGltZSBvZiB0aGUgc2FtZSB0aW1lXG4gICAgLy8gdmFyIGQgPSBhLmNsb25lKCkudHooXCJFdXJvcGUvTG9uZG9uXCIpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiIGxvbmRvbiB0aW1lIHpvbmU6IFwiLCBkLmZvcm1hdCgpKTtcblxuICAgIC8vIC8vIGdldCBuZXcgeW9yayB0aW1lIG9mIHRoZSBzYW1lIHRpbWVcbiAgICAvLyB2YXIgZSA9IGEuY2xvbmUoKS50eihcIkFtZXJpY2EvTmV3X1lvcmtcIik7XG4gICAgLy8gY29uc29sZS5sb2coXCIgbmV3IHlvcmsgdGltZSB6b25lOiBcIiwgZS5mb3JtYXQoKSk7XG4gIH1cblxuICBnZXREYXRlKCkge1xuICAgIHJldHVybiB0aGlzLl9jcnVkLmdldEFsbERhdGEoJ19kYXRlJykucGlwZShcbiAgICAgIG1hcCgoZG9jKSA9PiB7XG4gICAgICAgIHJldHVybiBkb2MuZG9jcy5tYXAoKGRhdGUpID0+IHtcbiAgICAgICAgICByZXR1cm4gZGF0ZS5kYXRhKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgZ2V0QWxsU2Vzc2lvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NydWQuZ2V0RGF0YUJ5T3JkZXIoJ3Nlc3Npb25zJywgJ2luZGV4JykucGlwZShcbiAgICAgIG1hcCgocmF3RGF0YSkgPT4ge1xuICAgICAgICByZXR1cm4gcmF3RGF0YS5tYXAoKGRvYykgPT4ge1xuICAgICAgICAgIHJldHVybiA8U2Vzc2lvbj57XG4gICAgICAgICAgICBpZDogZG9jLnBheWxvYWQuZG9jLmlkLFxuICAgICAgICAgICAgLi4uKGRvYy5wYXlsb2FkLmRvYy5kYXRhKCkgYXMgb2JqZWN0KSxcbiAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGJvb2tTZXNzaW9uKHNlc3Npb246IEJvb2tlZFNlc3Npb24pIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5fY3J1ZC5hZGREYXRhKHRoaXMuX2Jvb2tlZFNlc3Npb25zQ29sbGVjdGlvbiwgc2Vzc2lvbilcbiAgICAgIC50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHJlamVjdChlcnJvcikpO1xuICAgIH0pO1xuICB9XG5cbiAgY2FuY2VsU2Vzc2lvbih1c2VySUQ6c3RyaW5nLG1lbnRvcklEOnN0cmluZyxkYXRlOnN0cmluZyl7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcbiAgICAgIHRoaXMuX2NydWQuZ2V0RG9jQnlUaHJlZUZpZWxkKHRoaXMuX2Jvb2tlZFNlc3Npb25zQ29sbGVjdGlvbiwndXNlcklkJyx1c2VySUQsJ21lbnRvcklkJyxtZW50b3JJRCwnc2Vzc2lvbkRhdGUnLGRhdGUpLnN1YnNjcmliZShyZXM9PntcbiAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgaWYgKHJlcz8ubGVuZ3RoPjApIHtcbiAgICAgICAgICB0aGlzLl9jcnVkLmRlbGV0ZURhdGEodGhpcy5fYm9va2VkU2Vzc2lvbnNDb2xsZWN0aW9uLHJlc1swXS5pZCkudGhlbigoKT0+e1xuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKVxuICAgICAgICAgIH0pLmNhdGNoKCgpPT57XG4gICAgICAgICAgICByZWplY3QoZmFsc2UpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG4iXX0=