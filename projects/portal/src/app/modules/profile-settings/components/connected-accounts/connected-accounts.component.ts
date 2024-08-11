import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'DAL';
//Type: Connected Accounts Object

@Component({
  selector: 'app-connected-accounts',
  templateUrl: './connected-accounts.component.html',
  styleUrls: ['./connected-accounts.component.scss'],
})
export class ConnectedAccountsComponent implements OnInit {
  user: User;
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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.user = data['user'];
    });
  }

  // getUserAccountLink(website: string) {
  //   return
  // }

  onConnect(form: NgForm) {
    const { linkedin, github } = form.value;
  }
}
