import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from 'DAL';
import { map } from 'rxjs';

export const LoggedinGuard: CanActivateChildFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user.pipe(
    map((user) => {
      return user == null ? true : router.createUrlTree(['/']);
    })
  );
};
