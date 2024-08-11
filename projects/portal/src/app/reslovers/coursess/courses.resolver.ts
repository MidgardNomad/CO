import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { CoursesService, Course } from 'DAL';

export const CoursesResolver: ResolveFn<Course[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const coursesService = inject(CoursesService);
  return coursesService.getAllCourses();
};
