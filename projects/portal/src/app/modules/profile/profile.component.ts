import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { AuthService, User } from 'DAL';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  userDoc = <User>{};
  showSettingsButton = false;
  authServiceSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    //Check if the user is viewing their own profile or visiting another student's profile!
    this.authServiceSub = this.authService.user.subscribe((activeUser) => {
      this.route.paramMap.subscribe((paramMap) => {
        if (activeUser.uid === paramMap.get('uid')) {
          this.showSettingsButton = true;
        }
      });
    });

    //Get user data from resolver!
    this.route.data.subscribe((data: Data) => {
      this.userDoc = data['userData'];
      this.titleService.setTitle(this.userDoc.displayName);
    });
  }

  navigateToSettings() {
    this.router.navigate(['/profile-settings']);
  }

  ngOnDestroy(): void {
    this.authServiceSub.unsubscribe();
  }
}
