import { Component, OnInit } from '@angular/core';
import { UsersService } from 'DAL';

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
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${res.coords.latitude}&lon=${res.coords.longitude}`
        )
          .then((response) => {
            if (!response.ok)
              throw new Error(`Something went wrong: ${response.status}`);
            return response.json();
          })
          .then((data) => {
            localStorage.setItem('country', data.address.country);
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
    console.log('user doc',this.usersService.getUser());
 
    this.usersService.getUser();
  }
}
