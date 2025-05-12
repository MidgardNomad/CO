import { AngularFirestore } from '@angular/fire/compat/firestore';
import { OrderByDirection } from 'firebase/firestore';
import * as i0 from "@angular/core";
export declare class CrudService {
    private db;
    constructor(db: AngularFirestore);
    getData(collection: string): import("rxjs").Observable<import("@angular/fire/compat/firestore").DocumentChangeAction<unknown>[]>;
    getAllData(collection: string): import("rxjs").Observable<import("firebase/compat").default.firestore.QuerySnapshot<unknown>>;
    setSingleDoc(collectionName: string, docID: string, data: any): Promise<void>;
    getSignleDoc(collectionName: string, docID: string): import("rxjs").Observable<import("firebase/compat").default.firestore.DocumentSnapshot<unknown>>;
    addDataToSubCollection(collectionPath: string, data: any): Promise<import("@angular/fire/compat/firestore").DocumentReference<unknown>>;
    getSubCollectionData(collectionPath: string): import("rxjs").Observable<import("firebase/compat").default.firestore.QuerySnapshot<unknown>>;
    addData(collectionName: string, data: any): Promise<import("@angular/fire/compat/firestore").DocumentReference<unknown>>;
    updateData(collectionName: string, id: any, data: any): Promise<void>;
    deleteData(collectionName: string, id: any): Promise<void>;
    getSingleData(collectionName: string, id: string): import("rxjs").Observable<import("firebase/compat").default.firestore.DocumentSnapshot<unknown>>;
    getSignleDocSnap(collectionName: string, id: string): import("rxjs").Observable<import("@angular/fire/compat/firestore").Action<import("@angular/fire/compat/firestore").DocumentSnapshot<unknown>>>;
    getDataByOrder(collectionpath: string, field: string): import("rxjs").Observable<import("@angular/fire/compat/firestore").DocumentChangeAction<unknown>[]>;
    getSingleDocByField(collectionName: string, field: string, value: any): import("rxjs").Observable<import("firebase/compat").default.firestore.QuerySnapshot<unknown>>;
    getDocByTwoField(collectionName: string, field1: string, value1: any, field2: string, value2: any): import("rxjs").Observable<any[]>;
    getDocByThreeField(collectionName: string, field1: string, value1: any, field2: string, value2: any, field3: string, value3: any): import("rxjs").Observable<any[]>;
    getSingleDataByField(collectionName: string, field: string, value: any): import("rxjs").Observable<import("@angular/fire/compat/firestore").DocumentChangeAction<unknown>[]>;
    getDataByOneField(collectionName: string, field: string, value: any): import("rxjs").Observable<any[]>;
    getSingleDataAsc(collectionName: string): import("rxjs").Observable<{
        id: string;
    }>;
    getSingleDataByFieldWithLimit(collectionName: string, field: string, value: any, limit: number): import("rxjs").Observable<import("@angular/fire/compat/firestore").DocumentChangeAction<unknown>[]>;
    getSingleDataByFieldWithOrder(collectionName: string, field: string, value: any, orderField: string, order: OrderByDirection): import("rxjs").Observable<import("@angular/fire/compat/firestore").DocumentChangeAction<unknown>[]>;
    getSingleDataByFieldWithOrderAndLimit(collectionName: string, field: string, value: any, orderField: string, order: OrderByDirection, limit: number): import("rxjs").Observable<import("@angular/fire/compat/firestore").DocumentChangeAction<unknown>[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CrudService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CrudService>;
}
