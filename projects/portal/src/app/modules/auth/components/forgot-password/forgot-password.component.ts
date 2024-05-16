import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  constructor(
    private _location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  onGoBackToLogin() {
    this._location.back();
  }

  onSendCode() {
    this.router.navigate(['../verify'], { relativeTo: this.route });
  }
}
