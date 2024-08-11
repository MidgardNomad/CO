import { P } from '@angular/cdk/keycodes';
import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { User, UsersService } from 'DAL';
import { map, Observable, tap } from 'rxjs';

export const CourseLearnGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const usersService = inject(UsersService);
  const router = inject(Router);

  // console.log('GUARD');

  if (usersService.userDoc === null) {
    // console.log('user is null');
    return router.createUrlTree(['/auth']);
  } else {
    // console.log(`user is not null`);

    usersService.userDoc?.pipe(
      map((data) => {
        console.log('data',data);
      })
    );
  }
  return true;
};
