import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class PackagePricingService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZS1wcmljaW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9kYWwvc3JjL2xpYi9zZXJ2aWNlcy9wYWNrYWdlLXByaWNpbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUszQyxNQUFNLE9BQU8scUJBQXFCO0lBS2hDO1FBSFEsc0JBQWlCLEdBQVEsSUFBSSxDQUFDO1FBQzlCLHNCQUFpQixHQUFRLEVBQUUsQ0FBQztJQUVwQixDQUFDO0lBRWpCLDBCQUEwQixDQUFDLE9BQWM7UUFDdkMsTUFBTSxLQUFLLEdBQUUsT0FBTyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7UUFDbEYsTUFBTSxRQUFRLEdBQUUsT0FBTyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFBLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDbkQsT0FBTyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxDQUFDO0lBQ3pDLENBQUM7K0dBWFUscUJBQXFCO21IQUFyQixxQkFBcUIsY0FGcEIsTUFBTTs7NEZBRVAscUJBQXFCO2tCQUhqQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUGFja2FnZVByaWNpbmdTZXJ2aWNlIHtcblxuICBwcml2YXRlIHBhY2thZ2VQcmljZUluRUdQOm51bWJlcj0xOTk5O1xuICBwcml2YXRlIHBhY2thZ2VQcmljZUluVVNEOm51bWJlcj00OTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIGdldFBhY2thZ2VQcmljZUFuZEN1cnJlbmN5KGNvdW50cnk6c3RyaW5nKSA6e3ByaWNlOm51bWJlcixjdXJyZW5jeTpzdHJpbmd9e1xuICAgIGNvbnN0IHByaWNlPSBjb3VudHJ5ID09PSAnRWd5cHQnID8gdGhpcy5wYWNrYWdlUHJpY2VJbkVHUDogdGhpcy5wYWNrYWdlUHJpY2VJblVTRDtcbiAgICBjb25zdCBjdXJyZW5jeT0gY291bnRyeSA9PT0gJ0VneXB0JyA/ICdFR1AnOiAnVVNEJztcbiAgICByZXR1cm4ge3ByaWNlOnByaWNlLGN1cnJlbmN5OmN1cnJlbmN5fTtcbiAgfVxufVxuIl19