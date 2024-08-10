import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Data } from '@angular/router';
import { AuthService, User, UserProject, UsersService } from 'DAL';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  userDoc = <User>{};
  flag: string;
  isActiveUserProfile = false;
  userProjects: UserProject[];

  authServiceSub: Subscription;
  usersServiceSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.usersServiceSub = this.usersService
      .getUserProjects(this.route.snapshot.paramMap.get('uid'))
      .subscribe((projects) => {
        this.userProjects = projects;
      });
    //Check if this the active user is reaching their profile!
    this.route.paramMap.subscribe((params) => {
      this.authServiceSub = this.authService.user.subscribe((user) => {
        if (params.get('uid') === user.uid) {
          this.isActiveUserProfile = true;
        }
      });
    });
    //Get user data from resolver!
    this.route.data.subscribe((data: Data) => {
      this.userDoc = data['userData'];
      console.log(this.userDoc);
      this.titleService.setTitle(this.userDoc.displayName);
    });
  }
  ngOnDestroy(): void {
    this.authServiceSub.unsubscribe();
    this.usersServiceSub.unsubscribe();
  }
}
