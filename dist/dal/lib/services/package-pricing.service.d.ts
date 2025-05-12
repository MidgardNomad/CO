import * as i0 from "@angular/core";
export declare class PackagePricingService {
    private packagePriceInEGP;
    private packagePriceInUSD;
    constructor();
    getPackagePriceAndCurrency(country: string): {
        price: number;
        currency: string;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<PackagePricingService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PackagePricingService>;
}
