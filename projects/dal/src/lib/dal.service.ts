import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class DALService {

  constructor(private firestore: AngularFirestore) { }

  getData() {
    // get admin collection length 
    this.firestore.collection('admins').get().subscribe(snap => console.log('Done: Admins are ' + snap.size));
  }


}
