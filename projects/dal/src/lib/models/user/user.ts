import { courseLevel } from "./courseLevel";

export interface User {
    id: string,
    email: string,
    mobile: string,
    countryCode: string,
    password: string,
    firstName: string,
    lastName: string,
    role: string,
    active: boolean,
    lastLogin: Date,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
    deleted: boolean,
    avatar: string,
    bio: string,
    dob: Date,
    courseList: courseLevel[],


}
