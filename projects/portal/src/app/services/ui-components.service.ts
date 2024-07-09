import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UIComponentsService {
  hideHeaderAndFooter = new Subject<boolean>();
  userLoginAction = new Subject<boolean>();
  userSignupAction = new Subject<boolean>();
  userLogoutAction = new Subject<boolean>();
  userInfoPresist = new Subject<boolean>();
  userLogout = new Subject<boolean>();
}
