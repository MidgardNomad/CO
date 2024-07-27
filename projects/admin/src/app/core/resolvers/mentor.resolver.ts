import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Mentor, MentorService } from 'DAL';
import { inject } from '@angular/core';

export const MentorProfileResolver: ResolveFn<Observable<Mentor>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const mentorId = route.paramMap.get('id');
  const mentorService = inject(MentorService);
  return mentorService.getMentorByID(mentorId);
};
