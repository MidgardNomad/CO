import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { CoursesService, Project } from 'DAL';

export const ProjectResolver: ResolveFn<Project> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const courseID = route.paramMap.get('courseID');
  const projectID = route.paramMap.get('projectID');
  const coursesService = inject(CoursesService);

  return coursesService.getOneProject(courseID, projectID);
};
