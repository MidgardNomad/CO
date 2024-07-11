export interface Mentor {
  id: string;
  profilePicture: string;
  name: string;
  experience: number;
  expertise: string[];
  age: number;
  linkedInLink: string;
  weeklySchedule: sessionForm[];
}


export interface sessionForm {
  day: WeekDays;
  from: Date;
  duration: number;
  timeZone: string;
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