import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from 'DAL';
import { Observable, map, take } from 'rxjs';

export const LoggedoutGuard: CanActivateFn = (
  route,
  state
): Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user.pipe(
    take(1),
    map((user) => {
      return user == null ? router.createUrlTree(['/auth']) : true;
    })
  );
};
