import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  timer: number;

  constructor() {}

  ngOnInit(): void {
    this.timer =
      new Date(new Date().getTime() + 120000).getTime() - new Date().getTime();
    const time = setInterval(() => {
      if (this.timer <= 0) {
        clearInterval(time);
        return;
      }
      this.timer -= 1000;
    }, 1000);
  }
}
