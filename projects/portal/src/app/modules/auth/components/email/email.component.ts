import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
})
export class EmailComponent implements OnInit {
  userEmail = '';

  constructor(private router: Router, private route: ActivatedRoute) {
    this.userEmail =
      this.router.getCurrentNavigation().extras?.state['userEmail'];
  }

  ngOnInit(): void {}
}
