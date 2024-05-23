import { courseLevel } from './courseLevel';

export interface User {
  id: string;
  displayName: string;
  photoURL: string;
  isVerified: boolean;
  isPro: boolean;
  active: boolean;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  deleted: boolean;
  bio?: string;
  courseList: courseLevel[];
  connectedAccounts: string[];
}
