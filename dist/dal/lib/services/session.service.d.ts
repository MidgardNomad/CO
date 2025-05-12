import { CrudService } from './crud.service';
import { Session } from '../models/session/session';
import { BookedSession } from '../../public-api';
import * as i0 from "@angular/core";
export declare class SessionService {
    private _crud;
    private _mentorsCollection;
    private _bookedSessionsCollection;
    constructor(_crud: CrudService);
    getDate(): import("rxjs").Observable<unknown[]>;
    getAllSessions(): import("rxjs").Observable<Session[]>;
    bookSession(session: BookedSession): Promise<unknown>;
    cancelSession(userID: string, mentorID: string, date: string): Promise<unknown>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SessionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SessionService>;
}
