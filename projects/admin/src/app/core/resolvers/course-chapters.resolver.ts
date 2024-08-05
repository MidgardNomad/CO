import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Chapter, CoursesService } from 'DAL';
import { Observable } from 'rxjs';

export const ChaptersResolver: ResolveFn<Observable<Chapter[]>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const coursesService = inject(CoursesService);

  return coursesService.getChapters(route.paramMap.get('id'));
};
