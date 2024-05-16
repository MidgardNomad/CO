import { CanActivateFn,Router  } from '@angular/router';
import { environment } from 'projects/admin/src/environments/environment';
import { inject } from '@angular/core';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  return localStorage.getItem(environment.userToken) ? true : inject(Router).createUrlTree(['/auth']) ;
};
