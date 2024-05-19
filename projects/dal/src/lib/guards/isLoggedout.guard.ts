import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const LoggedoutGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  return localStorage.getItem('flag') ? true : router.createUrlTree(['/auth']);
};
