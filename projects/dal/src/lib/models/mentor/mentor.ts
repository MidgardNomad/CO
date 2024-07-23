export interface Mentor {
  id: string;
  profilePicture: string;
  name: string;
  experience: number;
  expertise: string[];
  birthdate: Date;
  linkedInLink: string;
  weeklySchedule: sessionForm[];
  timeZone: string;
}

export interface sessionForm {
  day: WeekDays;
  from: Date;
  duration: number;
}

// week days enum
export enum WeekDays {
  Sunday = 'Sunday',
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
}
