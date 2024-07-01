import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscriptions-list',
  templateUrl: './subscriptions-list.component.html',
  styleUrls: ['./subscriptions-list.component.scss']
})
export class SubscriptionsListComponent implements OnInit {

  constructor(private router:Router) {}

  ngOnInit(): void {
    
  }

  listPCKs(){

  }

  choosePCK(packPrice){    
    this.router.navigateByUrl(`/subscribe/pay`)
  }
}