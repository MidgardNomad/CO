import { CrudService } from './crud.service';
import * as i0 from "@angular/core";
export declare class AdminAuthService {
    private crudServices;
    private adminCollectionName;
    private admin;
    constructor(crudServices: CrudService);
    get windowRef(): Window & typeof globalThis;
    verifyUserToLogin(phoneNumber: string): Promise<unknown>;
    completeLogin(): boolean;
    logOut(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<AdminAuthService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AdminAuthService>;
}
