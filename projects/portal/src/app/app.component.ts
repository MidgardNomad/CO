import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  Renderer2 as Renderer,
  ViewChild,
} from '@angular/core';
import { User } from 'dist/dal/lib/models/user/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  usertest: User;

  constructor() {}

  ngOnInit(): void {}
}
