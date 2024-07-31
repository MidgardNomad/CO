import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminAuthService, environment } from 'DAL';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Component({
  selector: 'app-verify-phone-number',
  templateUrl: './verify-phone-number.component.html',
  styleUrls: ['./verify-phone-number.component.scss']
})
export class VerifyPhoneNumberComponent implements OnInit {
  phone: string;
  windowRef: any;
  verificationCode: string;

  constructor(private adminAuthService: AdminAuthService, public dialogRef: MatDialogRef<VerifyPhoneNumberComponent>, @Inject(MAT_DIALOG_DATA) public dialogData: any) { }

  ngOnInit(): void {
    this.phone = this.dialogData.phoneNumber;
    if (!firebase.apps.length) {
      firebase.initializeApp(environment.firebaseConfig);
      firebase.auth().languageCode = 'ar';
    } else {
      firebase.app(); // if already initialized, use that one
      firebase.auth().languageCode = 'ar';
    }
    this.recaptchaVerifierFun();
    this.sendLoginCode();
  }

  recaptchaVerifierFun() {
    this.windowRef = this.adminAuthService.windowRef;
    try {
      this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': () => { }
      });
    } catch (e) {
      console.log(
        'There was a problem in initializing the recapctha verifier: ' + e
      );
    }

    this.windowRef.recaptchaVerifier.render().then((widgetId: any) => {
      this.windowRef.recaptchaWidgetId = widgetId;
    });
  }

  sendLoginCode() {
    const appVerifier = this.windowRef.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(this.phone, appVerifier)
      .then((result: any) => {
        this.windowRef.confirmationResult = result;
        this.windowRef.recaptchaVerifier.clear();
      }).catch((error: any) => {
        console.log(error);
        this.dialogRef.close(false);
      });
  }

  verifyLoginCode() {
    console.log(this.verificationCode);
    if (this.verificationCode.length===6) {
      this.windowRef.confirmationResult.confirm(this.verificationCode).then((result: any) => {
        console.log(result);
        this.dialogRef.close(true);
      }).catch((error: any) => {
        console.log(error);
      });
    }
  }

  onOtpChange(data){
    this.verificationCode=data;
    console.log(data);
  }

  
}
