import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Mentor, MentorService } from 'DAL';
import { Observable } from 'rxjs';

export const MentorsResolver: ResolveFn<Observable<Mentor[]>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const mentorService = inject(MentorService);
  return mentorService.getMentors();
};
