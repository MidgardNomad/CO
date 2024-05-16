import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss'],
})
export class VerifyOtpComponent implements OnInit {
  otpCode: number;
  timer: number;
  isResendCodeActive = 0;
  constructor(
    private _location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.timer =
      new Date(new Date().getTime() + 120000).getTime() - new Date().getTime();
    const time = setInterval(() => {
      if (this.timer <= 0) {
        clearInterval(time);
        this.isResendCodeActive = 100;
        return;
      }
      this.timer -= 1000;
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
