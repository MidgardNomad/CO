import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { User } from 'projects/dal/src/lib/models/user/user';
import { AuthService } from 'DAL';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userDoc = <User>{};
  showSettingsButton = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    //Check if the user is viewing their own profile or visiting another student's profile!
    this.authService.user.subscribe((activeUser) => {
      if (activeUser.uid === this.route.snapshot.paramMap.get('uid')) {
        this.showSettingsButton = true;
      }
    });

    //Get user data from resolver!
    this.route.data.subscribe((data: Data) => {
      this.userDoc = data['userData'];
    });
  }

  navigateToSettings() {
    this.router.navigate(['/profile-settings']);
  }
}
