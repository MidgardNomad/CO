import { courseLevel } from './courseLevel';

export interface User {
  id: string;
  uid: string;
  email: string;
  mobile: string;
  displayName: string;
  isVerified: boolean;
  isPro: boolean;
  active: boolean;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  deleted: boolean;
  photoURL: string;
  bio?: string;
  courseList: courseLevel[];
}
