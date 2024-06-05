import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { OrderByDirection } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})

export class CrudService {
  // set the collection name on calling the service
  // collectionName: string = '';

  constructor(private db: AngularFirestore) {
    // this.collectionName = '';
    // if (this.collectionName == '') {
    //   console.log(
    //     'Please set the collection name in the service before calling any method.'
    //   );
    // }
  }

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

  //Get Data Ordered
  getDataByOrder(collectionpath: string, field: string) {
    return this.db
      .collection(collectionpath, (ref) => ref.orderBy(field))
      .snapshotChanges();
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
