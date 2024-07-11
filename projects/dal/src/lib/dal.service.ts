import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class DALService {

  constructor(private firestore: AngularFirestore) { }

  getData() {
    // get admin collections available in career officer project
    return {
      collections: ['users', 'admin', 'career', 'path', 'course', 'class', 'content', 'quiz',],
    }
  }
}



