import { Mentor, sessionForm } from '../models/mentor/mentor';
import { CrudService } from './crud.service';
import * as i0 from "@angular/core";
export declare class MentorService {
    private _crud;
    private _mentorsCollection;
    private _sessionsCollection;
    private _bookedSessions;
    constructor(_crud: CrudService);
    getMentors(): import("rxjs").Observable<Mentor[]>;
    getMentorByID(mentorID: string): import("rxjs").Observable<Mentor>;
    addMentor(mentor: Mentor): Promise<unknown>;
    updateMentor(mentorID: string, mentor: Mentor): Promise<void>;
    deleteMentor(mentorID: string): Promise<void>;
    getMentorSessions(mentorID: string): import("rxjs").Observable<any[]>;
    addToSessionSchedule(mentorID: string, session: sessionForm[]): Promise<unknown>;
    getMenorBySessionID(sessionID: string): import("rxjs").Observable<any[]>;
    getAllStudentReservedSession(day: string, date: string): import("rxjs").Observable<any[]>;
    updateMentorProfilePicture(mentorID: string, profilePicture: string): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MentorService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MentorService>;
}
