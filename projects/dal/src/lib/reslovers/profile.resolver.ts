import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { User } from '../models/user/user';
import { inject } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { Observable, from, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const UserProfileResolver: ResolveFn<Observable<User>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const crudService = inject(CrudService);
  const router = inject(Router);
  return crudService.getSingleData('users', route.paramMap.get('uid')).pipe(
    map((docSnap) => {
      if (docSnap.exists) {
        return <User>{
          id: docSnap.id,
          ...(docSnap.data() as object),
        };
      }
      authService.user.subscribe((user) => {
        router.navigate(['profile', user.uid]);
      });
      return <User>{};
    })
  );
};
// ...(docSnap.data() as Object),
