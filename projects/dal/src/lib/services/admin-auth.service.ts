import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  private adminCollectionName: string = 'admin';
  private admin;

  constructor(private crudServices: CrudService) { }

  get windowRef() {
    return window;
  }

  verifyUserToLogin(phoneNumber: string) {
    console.log(phoneNumber);
    return new Promise((resolve, reject) => {
      this.crudServices.getSingleDocByField(this.adminCollectionName, 'phone', phoneNumber).subscribe({
        next: (res) => {
          console.log('verify res', res);
          const userData = res.docs.map((ele:any) => {
            return{
              id: ele.id,
              ...ele.data()
            }
          })
          console.log('userData', userData);
          if (userData.length > 0) {
            this.admin=userData[0];
            resolve(userData[0])
          }
          resolve(false);
        },
        error: (err) => {
          reject(err);
        }
      });
    })
  }

  completeLogin() {
    this.admin.updatedAt=new Date(`${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`).getTime();
    this.crudServices.updateData(this.adminCollectionName,this.admin.id,this.admin);
    localStorage.setItem('id',this.admin.id);
    return true;
  }
  
  logOut() {
    localStorage.removeItem('id');
    return true;
  }



}
