import { CrudService } from './crud.service';
import { Lecture } from '../models/content/lecture';
import { Chapter } from '../models/content/chapter';
import * as i0 from "@angular/core";
export declare class LearnService {
    private crudService;
    constructor(crudService: CrudService);
    private _coursesCollection;
    private _chaptersCollection;
    private _lecturesCollection;
    getSingleLectureByID(courseID: string, chapterID: string, lectureId: string): import("rxjs").Observable<Lecture>;
    getNextLectureID(courseID: string, chapterID: string, seqNo: number): import("rxjs").Observable<string[]>;
    getFirstLectureIDOfChapter(courseId: string, chapterId: string): import("rxjs").Observable<string[]>;
    getSigleChapter(courseID: string, chapterID: string): import("rxjs").Observable<Chapter>;
    getNextChapterID(courseID: string, seqNo: number): import("rxjs").Observable<string>;
    getNextCourseID(seqNo: number): import("rxjs").Observable<string[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<LearnService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LearnService>;
}
