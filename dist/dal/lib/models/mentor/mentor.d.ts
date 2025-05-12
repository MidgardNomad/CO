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
    freeDay: string;
    from: string;
    duration: number;
}
export interface dayTime {
    time: string;
    duration: number;
}
export interface sessionForm {
    day: WeekDays;
    from: dayTime[];
}
export declare enum WeekDays {
    Sunday = "Sunday",
    Monday = "Monday",
    Tuesday = "Tuesday",
    Wednesday = "Wednesday",
    Thursday = "Thursday",
    Friday = "Friday",
    Saturday = "Saturday"
}
