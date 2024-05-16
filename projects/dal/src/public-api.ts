import { SsType } from './lib/models/content/ss';
/*
 * Public API Surface of dal
 */

export * from './lib/dal.service';
export * from './lib/dal.component';
export * from './lib/dal.module';

export { CrudService } from './lib/services/crud.service';
export { AuthService } from './lib/services/auth.service';

// export models
export { Ss, SsType } from './lib/models/content/ss';
export { Lecture } from './lib/models/content/lecture';
