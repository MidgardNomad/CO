import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Chapter } from 'DAL';

export const ChaptersResolver: ResolveFn<Chapter> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  console.log(route.paramMap.get('id'));
  return {} as Chapter;
};
