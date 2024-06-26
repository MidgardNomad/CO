import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Course, CoursesService } from 'DAL';
import { Observable } from 'rxjs';

const LearnCourseResolver: ResolveFn<Observable<Course>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const coursesSerive = inject(CoursesService);
  const courseID = route.paramMap.get('courseID');
  return coursesSerive.getCourse(courseID);
};
