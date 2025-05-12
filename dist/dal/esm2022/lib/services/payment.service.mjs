import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class PaymentService {
    constructor(http) {
        this.http = http;
    }
    createPaymentIntent(obj) {
        return this.http.post(`${environment.api}payment/create-payment-intent`, obj).toPromise();
    }
    checkPayment(obj) {
        return this.http.post(`${environment.api}payment/check-payment`, obj).toPromise();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PaymentService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PaymentService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PaymentService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZGFsL3NyYy9saWIvc2VydmljZXMvcGF5bWVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdDQUFnQyxDQUFDOzs7QUFLN0QsTUFBTSxPQUFPLGNBQWM7SUFFekIsWUFBb0IsSUFBZTtRQUFmLFNBQUksR0FBSixJQUFJLENBQVc7SUFBSSxDQUFDO0lBRXhDLG1CQUFtQixDQUFDLEdBQUc7UUFDckIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLFdBQVcsQ0FBQyxHQUFHLCtCQUErQixFQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzNGLENBQUM7SUFFRCxZQUFZLENBQUMsR0FBRztRQUNkLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxXQUFXLENBQUMsR0FBRyx1QkFBdUIsRUFBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuRixDQUFDOytHQVZVLGNBQWM7bUhBQWQsY0FBYyxjQUZiLE1BQU07OzRGQUVQLGNBQWM7a0JBSDFCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi4vLi4vZW52aXJvbm1lbnRzL2Vudmlyb25tZW50JztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFBheW1lbnRTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6SHR0cENsaWVudCkgeyB9XG5cbiAgY3JlYXRlUGF5bWVudEludGVudChvYmope1xuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChgJHtlbnZpcm9ubWVudC5hcGl9cGF5bWVudC9jcmVhdGUtcGF5bWVudC1pbnRlbnRgLG9iaikudG9Qcm9taXNlKCk7XG4gIH1cblxuICBjaGVja1BheW1lbnQob2JqKXtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoYCR7ZW52aXJvbm1lbnQuYXBpfXBheW1lbnQvY2hlY2stcGF5bWVudGAsb2JqKS50b1Byb21pc2UoKTtcbiAgfVxufVxuIl19