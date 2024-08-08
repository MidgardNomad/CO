import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { User, UsersService } from 'DAL';
import { Observable } from 'rxjs';

export const UserResovler: ResolveFn<Observable<User>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const usersService = inject(UsersService);

  return usersService.userDoc;
};
