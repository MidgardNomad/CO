import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { CoursesService, Ss } from 'DAL';
import { Observable } from 'rxjs';

export const LearnSlidesResolver: ResolveFn<Observable<Ss[]>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const coursesService = inject(CoursesService);
  return coursesService.getAllSlides(
    route.paramMap.get('courseID'),
    route.paramMap.get('chapterID'),
    route.paramMap.get('lectureID')
  );
};
