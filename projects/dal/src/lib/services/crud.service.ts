import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { OrderByDirection } from 'firebase/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(private db: AngularFirestore) {}

  // get all data (snapshot)
  getData(collection: string) {
    return this.db.collection(collection).snapshotChanges();
  }

  //get all data using get()
  getAllData(collection: string) {
    return this.db.collection(collection).get();
  }

  //set a single Document with a custom ID
  setSingleDoc(collectionName: string, docID: string, data: any) {
    return this.db.doc(`/${collectionName}/${docID}`).set(data);
  }

  //Get a document by ID
  getSignleDoc(collectionName: string, docID: string) {
    return this.db.doc(`/${collectionName}/${docID}`).get();
  }

  //Create a subcollection
  addDataToSubCollection(collectionPath: string, data: any) {
    return this.db.collection(collectionPath).add(data);
  }

  //get data from a sub collection
  getSubCollectionData(collectionPath: string) {
    return this.db.collection(collectionPath).get();
  }

  // add data
  addData(collectionName: string, data: any) {
    return this.db.collection(collectionName).add(data);
  }

  // update data
  updateData(collectionName: string, id: any, data: any) {
    return this.db.collection(collectionName).doc(id).update(data);
  }

  // delete data
  deleteData(collectionName: string, id: any) {
    return this.db.collection(collectionName).doc(id).delete();
  }

  // get single data
  getSingleData(collectionName: string, id: string) {
    return this.db.collection(collectionName).doc(id).get();
  }

  //Get Single Doc snapshot
  getSignleDocSnap(collectionName: string, id: string) {
    return this.db.collection(collectionName).doc(id).snapshotChanges();
  }

  //Get Data Ordered
  getDataByOrder(collectionpath: string, field: string) {
    return this.db
      .collection(collectionpath, (ref) => ref.orderBy(field))
      .snapshotChanges();
  }

  getSingleDocByField(collectionName: string, field: string, value: any) {
    return this.db
      .collection(collectionName, (ref) => ref.where(field, '==', value))
      .get();
  }

  getDocByTwoField(collectionName: string, field1: string, value1: any,field2:string,value2:any) {
    return this.db
      .collection(collectionName, (ref) => ref.where(field1, '==', value1).where(field2,'==',value2))
      .get().pipe(map((res) => res.docs.map((c: any) => { return { ...c.data() }; })))
  }

  getDocByThreeField(collectionName: string, field1: string, value1: any,field2:string,value2:any,field3:string,value3:any) {
    return this.db
      .collection(collectionName, (ref) => ref.where(field1, '==', value1).where(field2,'==',value2).where(field3,'==',value3))
      .get().pipe(map((res) => res.docs.map((c: any) => { return { ...c.data(),id:c.id }; })))
  }

  // get single data snapshotChanges
  getSingleDataByField(collectionName: string, field: string, value: any) {
    return this.db
      .collection(collectionName, (ref) => ref.where(field, '==', value))
      .snapshotChanges();
  }

  // get single data snapshotChanges
  getDataByOneField(collectionName: string, field: string, value: any) {
    return this.db
      .collection(collectionName, (ref) => ref.where(field, '==', value))
      .get().pipe(map((res) => res.docs.map((c: any) => { return { ...c.data(),id:c.id }; })))
  }

    // get single data Asc
    getSingleDataAsc(collectionName: string) {
      return this.db
        .collection(collectionName, (ref) => ref.orderBy('seqNo').limit(1))
        .get().pipe(map(data => { const doc = data.docs[0]; return doc ? { id: doc.id, ...doc.data } : null}));
    }

  // get single data
  getSingleDataByFieldWithLimit(
    collectionName: string,
    field: string,
    value: any,
    limit: number
  ) {
    return this.db
      .collection(collectionName, (ref) =>
        ref.where(field, '==', value).limit(limit)
      )
      .snapshotChanges();
  }

  // get single data
  getSingleDataByFieldWithOrder(
    collectionName: string,
    field: string,
    value: any,
    orderField: string,
    order: OrderByDirection
  ) {
    return this.db
      .collection(collectionName, (ref) =>
        ref.where(field, '==', value).orderBy(orderField, order)
      )
      .snapshotChanges();
  }

  // get single data
  getSingleDataByFieldWithOrderAndLimit(
    collectionName: string,
    field: string,
    value: any,
    orderField: string,
    order: OrderByDirection,
    limit: number
  ) {
    return this.db
      .collection(collectionName, (ref) =>
        ref.where(field, '==', value).orderBy(orderField, order).limit(limit)
      )
      .snapshotChanges();
  }
}
