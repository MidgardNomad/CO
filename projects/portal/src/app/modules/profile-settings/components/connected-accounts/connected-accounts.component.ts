import { Component, OnInit } from '@angular/core';
import { ConnectedAccounts, UsersService } from 'DAL';
import { take } from 'rxjs';

//Type: Connected Accounts Object

@Component({
  selector: 'app-connected-accounts',
  templateUrl: './connected-accounts.component.html',
  styleUrls: ['./connected-accounts.component.scss'],
})
export class ConnectedAccountsComponent implements OnInit {
  connectedAccounts: ConnectedAccounts[] = [];
  accountTemplates: { website: string; example: string }[] = [
    {
      website: 'LinkedIn',
      example: 'https://www.linkedin.com/in/username',
    },
    {
      website: 'GitHub',
      example: 'https://github.com/username',
    },
  ];

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    // this.usersService
    //   .getUserID()
    //   .pipe(take(1))
    //   .subscribe((userID) => {
    //     this.usersService.getSingleUser(userID).subscribe((user) => {
    //       this.connectedAccounts = user.connectedAccounts;
    //       console.log(this.connectedAccounts);
    //     });
    //   });
  }

  onConnect() {}
}
