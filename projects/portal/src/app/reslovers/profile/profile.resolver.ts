import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { User, CrudService, AuthService } from 'DAL';
import { inject } from '@angular/core';
import { Observable, map, of } from 'rxjs';

export const UserProfileResolver: ResolveFn<Observable<User>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const crudService = inject(CrudService);
  const router = inject(Router);
  if (route.paramMap.get('uid') == null) {
    authService.user.subscribe((user) => {
      router.navigate(['profile', user.uid]);
    });
    return of(<User>{});
  } else {
    return crudService.getSingleData('users', route.paramMap.get('uid')).pipe(
      map((docSnap) => {
        if (docSnap.exists) {
          return <User>{
            id: docSnap.id,
            ...(docSnap.data() as object),
          };
        } else {
          router.navigate(['not-found']);
          return <User>{};
        }
      })
    );
  }
};
