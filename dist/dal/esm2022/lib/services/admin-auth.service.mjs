import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./crud.service";
export class AdminAuthService {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AdminAuthService, deps: [{ token: i1.CrudService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AdminAuthService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AdminAuthService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.CrudService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW4tYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZGFsL3NyYy9saWIvc2VydmljZXMvYWRtaW4tYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQU8zQyxNQUFNLE9BQU8sZ0JBQWdCO0lBSzNCLFlBQW9CLFlBQXlCO1FBQXpCLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBSHJDLHdCQUFtQixHQUFXLE9BQU8sQ0FBQztJQUdHLENBQUM7SUFFbEQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELGlCQUFpQixDQUFDLFdBQW1CO1FBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDekIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUMsU0FBUyxDQUFDO2dCQUM5RixJQUFJLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtvQkFDWixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDL0IsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFPLEVBQUUsRUFBRTt3QkFDeEMsT0FBTTs0QkFDSixFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUU7NEJBQ1YsR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFO3lCQUNkLENBQUE7b0JBQ0gsQ0FBQyxDQUFDLENBQUE7b0JBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQ2xDLElBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7d0JBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN2QixPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7cUJBQ3JCO29CQUNELE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDakIsQ0FBQztnQkFDRCxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtvQkFDYixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2QsQ0FBQzthQUNGLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELGFBQWE7UUFDWCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDMUgsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRixZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELE1BQU07UUFDSixZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzsrR0EvQ1UsZ0JBQWdCO21IQUFoQixnQkFBZ0IsY0FGZixNQUFNOzs0RkFFUCxnQkFBZ0I7a0JBSDVCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ3J1ZFNlcnZpY2UgfSBmcm9tICcuL2NydWQuc2VydmljZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBBZG1pbkF1dGhTZXJ2aWNlIHtcblxuICBwcml2YXRlIGFkbWluQ29sbGVjdGlvbk5hbWU6IHN0cmluZyA9ICdhZG1pbic7XG4gIHByaXZhdGUgYWRtaW47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjcnVkU2VydmljZXM6IENydWRTZXJ2aWNlKSB7IH1cblxuICBnZXQgd2luZG93UmVmKCkge1xuICAgIHJldHVybiB3aW5kb3c7XG4gIH1cblxuICB2ZXJpZnlVc2VyVG9Mb2dpbihwaG9uZU51bWJlcjogc3RyaW5nKSB7XG4gICAgY29uc29sZS5sb2cocGhvbmVOdW1iZXIpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmNydWRTZXJ2aWNlcy5nZXRTaW5nbGVEb2NCeUZpZWxkKHRoaXMuYWRtaW5Db2xsZWN0aW9uTmFtZSwgJ3Bob25lJywgcGhvbmVOdW1iZXIpLnN1YnNjcmliZSh7XG4gICAgICAgIG5leHQ6IChyZXMpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygndmVyaWZ5IHJlcycsIHJlcyk7XG4gICAgICAgICAgY29uc3QgdXNlckRhdGEgPSByZXMuZG9jcy5tYXAoKGVsZTphbnkpID0+IHtcbiAgICAgICAgICAgIHJldHVybntcbiAgICAgICAgICAgICAgaWQ6IGVsZS5pZCxcbiAgICAgICAgICAgICAgLi4uZWxlLmRhdGEoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgY29uc29sZS5sb2coJ3VzZXJEYXRhJywgdXNlckRhdGEpO1xuICAgICAgICAgIGlmICh1c2VyRGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmFkbWluPXVzZXJEYXRhWzBdO1xuICAgICAgICAgICAgcmVzb2x2ZSh1c2VyRGF0YVswXSlcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiAoZXJyKSA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pXG4gIH1cblxuICBjb21wbGV0ZUxvZ2luKCkge1xuICAgIHRoaXMuYWRtaW4udXBkYXRlZEF0PW5ldyBEYXRlKGAke25ldyBEYXRlKCkuZ2V0RGF0ZSgpfS8ke25ldyBEYXRlKCkuZ2V0TW9udGgoKSsxfS8ke25ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKX1gKS5nZXRUaW1lKCk7XG4gICAgdGhpcy5jcnVkU2VydmljZXMudXBkYXRlRGF0YSh0aGlzLmFkbWluQ29sbGVjdGlvbk5hbWUsdGhpcy5hZG1pbi5pZCx0aGlzLmFkbWluKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaWQnLHRoaXMuYWRtaW4uaWQpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIFxuICBsb2dPdXQoKSB7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2lkJyk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuXG5cbn1cbiJdfQ==