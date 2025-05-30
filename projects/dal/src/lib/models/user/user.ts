import { ConnectedAccounts } from './connectedAccounts';
import { CourseLevel } from './courseLevel';

export interface User {
  id: string;
  displayName: string;
  email: string;
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
  streakDays: Date[];
  currentStreak: number;
  maxStreak: number;
  courseList: CourseLevel[];
  linkedIn: string;
  gitHub: string;
  paid: boolean;
  sessionExpirationDate: Date;
  // availableSessions: number;
  countryCode: string;
  country: string;

  timeZone: string;

  isExist?: boolean;
}
