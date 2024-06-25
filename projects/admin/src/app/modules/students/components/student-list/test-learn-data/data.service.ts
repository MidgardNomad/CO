import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private db: AngularFirestore) {}
  getAllData() {
    return this.db.collection('corses').snapshotChanges();
  }
}
