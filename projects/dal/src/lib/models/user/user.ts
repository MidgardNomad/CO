import { ConnectedAccounts } from './connectedAccounts';
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
  streakDays: Date[];
  currentStreak: number;
  maxStreak: number;
  courseList: courseLevel[];
  connectedAccounts: ConnectedAccounts[];
  paid: boolean;
  sessionExpirationDate: Date;
  availableSessions: number;
}
