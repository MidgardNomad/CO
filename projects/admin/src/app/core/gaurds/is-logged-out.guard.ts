import { CanActivateFn,Router  } from '@angular/router';
import { environment } from 'projects/admin/src/environments/environment';
import { inject } from '@angular/core';

export const isLoggedOutGuard: CanActivateFn = (route, state) => {
  return localStorage.getItem(environment.userToken) ? inject(Router).createUrlTree(['/']): true ;

};
