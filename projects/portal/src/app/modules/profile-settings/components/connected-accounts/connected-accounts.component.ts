import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User, UsersService } from 'DAL';
import { loadingAnimation } from 'projects/portal/src/app/shared/functions/loadingAnimation';
import { showSnackbar } from 'projects/portal/src/app/shared/functions/showsnackbar';
//Type: Connected Accounts Object

@Component({
  selector: 'app-connected-accounts',
  templateUrl: './connected-accounts.component.html',
  styleUrls: ['./connected-accounts.component.scss'],
})
export class ConnectedAccountsComponent implements OnInit {
  user: User;
  @ViewChild('connectedAccounts') connectedAccounts: ElementRef;
  @ViewChild('loadingSpinner') loadingSpinner: ElementRef;
  showSnackBar = showSnackbar();
  loadingAnimation = loadingAnimation();

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.user = data['user'];
    });
  }

  async onConnect(form: NgForm) {
    this.loadingAnimation(
      'block',
      0.8,
      this.loadingSpinner,
      this.connectedAccounts
    );
    try {
      const { linkedIn, gitHub } = form.value;
      console.log(linkedIn);
      console.log(gitHub);
      if (linkedIn && !gitHub) {
        await this.usersService.addUserSocials(this.user.id, {
          linkedIn: linkedIn,
        });
      } else if (!linkedIn && gitHub) {
        await this.usersService.addUserSocials(this.user.id, {
          gitHub: gitHub,
        });
      } else if (!linkedIn && !gitHub) {
      } else {
        await this.usersService.addUserSocials(this.user.id, {
          linkedIn: linkedIn,
          gitHub: gitHub,
        });
      }
      this.loadingAnimation(
        'none',
        1,
        this.loadingSpinner,
        this.connectedAccounts
      );
      this.showSnackBar(
        'Profile info updated successfully',
        'success-snackbar'
      );
    } catch (e) {
      this.loadingAnimation(
        'none',
        1,
        this.loadingSpinner,
        this.connectedAccounts
      );
      this.showSnackBar(
        'Something went wrong! Please, try again later',
        'fail-snackbar'
      );

      console.log(e);
    }
  }
}
