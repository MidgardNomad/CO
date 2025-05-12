import { HttpClient } from '@angular/common/http';
import * as i0 from "@angular/core";
export declare class PaymentService {
    private http;
    constructor(http: HttpClient);
    createPaymentIntent(obj: any): Promise<Object>;
    checkPayment(obj: any): Promise<Object>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PaymentService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PaymentService>;
}
