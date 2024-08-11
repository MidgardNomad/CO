import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { CoursesService, Project } from 'DAL';
import { Observable } from 'rxjs';

export const CourseProjectResolver: ResolveFn<Project[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const coursesService = inject(CoursesService);
  const courseID = route.paramMap.get('courseID');
  return coursesService.getDataProject(courseID);
};
