import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

export const EamilVerificationGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  if (router.getCurrentNavigation().extras?.state == undefined) {
    return router.createUrlTree(['auth']);
  } else {
    return true;
  }
};
