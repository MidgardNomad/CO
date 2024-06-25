import { map, tap } from 'rxjs';
import { CrudService } from './crud.service';
import { User } from '../models/user/user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private crudService: CrudService) {}

  getAllUsers() {
    return this.crudService.getData('users').pipe(
      map((docSnaps) => {
        return docSnaps.map((docSnap) => {
          return {
            id: docSnap.payload.doc.id,
            ...(docSnap.payload.doc.data() as object),
          } as User;
        });
      })
    );
  }

  getSingleUser(userID: string) {
    return this.crudService.getSignleDoc('users', userID).pipe(
      tap((userDocSnap) => {
        return <User>{
          id: userDocSnap.id,
          ...(userDocSnap.data() as object),
        };
      })
    );
  }
  // get data coursrs
  getUserCourses() {}
}
