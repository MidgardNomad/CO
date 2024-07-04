import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UIComponentsService {
  hideHeaderAndFooter = new Subject<boolean>();
  userInfoPresist = new Subject<boolean>();
  userLogout = new Subject<boolean>();

  setRouteTitle(title: string) {
    return title;
  }
}
