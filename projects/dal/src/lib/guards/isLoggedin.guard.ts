import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

export const LoggedinGuard: CanActivateChildFn = (route, state) => {
  const router = inject(Router);
  return !localStorage.getItem('flag') ? true : router.createUrlTree(['/']);
};
