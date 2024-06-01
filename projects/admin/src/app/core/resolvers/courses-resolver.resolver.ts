import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Course, CoursesService } from 'DAL';
import { Observable } from 'rxjs';

export const CoursesResolver: ResolveFn<Observable<Course[]>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const coursesService = inject(CoursesService);
  return coursesService.getAllCourses();
};
