import { Component, OnInit } from '@angular/core';
import { UsersService } from 'DAL';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private usersService: UsersService) {}

  private getUserCountry() {
    navigator.geolocation.getCurrentPosition(
      (res) => {
        fetch(
          `https://geocode.xyz/${res.coords.latitude},${res.coords.longitude}?geoit=json`
        )
          .then((response) => {
            if (!response.ok)
              throw new Error(`Something went wrong: ${response.status}`);
            return response.json();
          })
          .then((data) => {
            console.log(data);
            localStorage.setItem('country', data.country);
          });
      },
      (err) => console.log(err)
    );
  }

  ngOnInit(): void {
    if (
      !localStorage.getItem('country') ||
      localStorage.getItem('country') == 'undefined'
    ) {
      this.getUserCountry();
    }
    this.usersService.getUser();
  }
}
