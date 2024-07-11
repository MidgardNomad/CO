import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminAuthService } from 'DAL';
import { VerifyPhoneNumberComponent } from 'projects/admin/src/app/modal/verify-phone-number/verify-phone-number.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  isLoading:boolean=false;

  constructor(private router:Router,private dialog:MatDialog,private adminAuthServices:AdminAuthService) {};
  
  login(loginForm : NgForm) {
    console.log('login form',loginForm);    
    const phoneNumber=`+2${loginForm.value?.phone}`;
    if (phoneNumber) {
      this.adminAuthServices.verifyUserToLogin(phoneNumber).then((res) => {
        if (res) {
          console.log(res);
          if (res['id']) {
            this.isLoading=true;
            const ref = this.dialog.open(VerifyPhoneNumberComponent, {data:{phoneNumber:phoneNumber}});
            ref.afterClosed().subscribe((result) => {
              console.log(result);
              if (result) {
                const data=this.adminAuthServices.completeLogin();
                if (data) {
                  this.router.navigateByUrl('/');
                }
                this.isLoading=false;
              } else {
                this.isLoading=false;
                console.log('invalid otp');
              }
            })
            
          }else{
            console.log('invalid user phone');
            
          }
        }
      }).catch((err) => {
        console.log(err);
      })
    }
  }

}
