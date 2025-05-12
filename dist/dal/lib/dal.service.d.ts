import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as i0 from "@angular/core";
export declare class DALService {
    private firestore;
    constructor(firestore: AngularFirestore);
    getData(): {
        collections: string[];
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<DALService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DALService>;
}
