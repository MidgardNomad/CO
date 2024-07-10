import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { OrderByDirection } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(private db: AngularFirestore) {}

  // get all data
  getData(collection: string) {
    return this.db.collection(collection).snapshotChanges();
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

  // get single data
  getSingleDataByField(collectionName: string, field: string, value: any) {
    return this.db
      .collection(collectionName, (ref) => ref.where(field, '==', value))
      .snapshotChanges();
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
