import { SsType } from './lib/models/content/ss';
/*
 * Public API Surface of dal
 */

export * from './lib/dal.service';
export * from './lib/dal.component';
export * from './lib/dal.module';

//Export Services
export { CrudService } from './lib/services/crud.service';
export { AuthService } from './lib/services/auth.service';
export { CoursesService } from './lib/services/courses.service';

// export models
export { Admin } from './lib/models/admin/admin';
export { Chapter } from './lib/models/content/chapter';
export { Course } from './lib/models/content/course';
export { Cp } from './lib/models/content/cp';
export { Lecture } from './lib/models/content/lecture';
export { Ss } from './lib/models/content/ss';
export { User } from './lib/models/user/user';
export { courseLevel } from './lib/models/user/courseLevel';
