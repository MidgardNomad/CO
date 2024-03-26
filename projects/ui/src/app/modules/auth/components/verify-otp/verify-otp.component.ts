import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss'],
})
export class VerifyOtpComponent implements OnInit {
  otpCode: number;
  countDown = 60;
  isResendCodeActive = 0;
  constructor(
    private _location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const timer = setInterval(() => {
      if (this.countDown === 0) {
        clearInterval(timer);
        this.isResendCodeActive = 100;
        return;
      }
      this.countDown -= 1;
    }, 1000);
  }

  onGoBack() {
    this._location.back();
  }

  onResendCode() {}

  onOtpChange(f) {
    this.otpCode = f;
  }

  onSubmit() {
    console.log(this.otpCode);
    this.router.navigate(['../reset-password'], { relativeTo: this.route });
  }
}
