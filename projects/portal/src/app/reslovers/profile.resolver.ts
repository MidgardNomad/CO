import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { User } from 'DAL';
import { inject } from '@angular/core';
import { CrudService } from 'DAL';
import { Observable, from, map, of, tap } from 'rxjs';
import { AuthService } from 'DAL';

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

// userData = <User>{
//   active: true,
//   connectedAccounts: [],
//   courseList: [],
//   createdAt: new Date(),
//   deleted: false,
//   deletedAt: new Date(),
//   displayName: 'non',
//   id: 'dsfsdf',
//   isPro: false,
//   isVerified: false,
//   lastLogin: new Date(),
//   photoURL: 'none',
//   updatedAt: new Date(),
//   bio: null,
// };

// if (route.paramMap.get('uid') == null) {
//     authService.user.pipe(
//       tap((user) => {
//         router.createUrlTree(['profile', user.uid]);
//       })
//     );
//     return of(<User>{});
//   }
//   return crudService.getSingleData('users', route.paramMap.get('uid')).pipe(
//     map((userDocSnap) => {
//       if (userDocSnap.exists) {
//         return <User>{
//           id: userDocSnap.id,
//           ...(userDocSnap.data() as object),
//         };
//       } else {
//         authService.user.pipe(
//           tap((user) => {
//             router.navigate(['profile', user.uid]);
//           })
//         );
//         return <User>{};
//       }
//     })
//   );
