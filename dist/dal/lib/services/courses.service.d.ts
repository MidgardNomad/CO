import { CrudService } from './crud.service';
import { Course } from '../models/content/course';
import { Chapter } from '../models/content/chapter';
import { Lecture } from '../models/content/lecture';
import { Ss } from '../models/content/ss';
import { Observable } from 'rxjs';
import { Project } from '../models/content/project';
import * as i0 from "@angular/core";
export declare class CoursesService {
    private crudSerive;
    private _coursesCollection;
    private _chaptersCollection;
    private _projectsCollection;
    private _lecturesCollection;
    private _slidesCollection;
    constructor(crudSerive: CrudService);
    getAllCourses(): Observable<Course[]>;
    getCourse(courseID: string): Observable<Course>;
    createNewCourse(courseTitle: string, courseDescription: string, seqNo: number): Promise<unknown>;
    editCourse(courseID: string, data: any): Promise<unknown>;
    deleteCourse(courseID: string): Promise<unknown>;
    getChapters(courseID: string): Observable<Chapter[]>;
    getFirstChapter(courseID: string): Observable<string>;
    createNewCourseChapter(courseID: string, data: {
        title: string;
        description: string;
        seqNo: number;
    }): Promise<unknown>;
    editChapterDetails(courseID: string, chapterID: string, data: any): Promise<unknown>;
    deleteChapter(courseID: string, chapterID: string): Promise<unknown>;
    addProjects(id: string, data: {
        title: string;
        content: string;
        image: any;
    }): void;
    getDataProject(id: string): Observable<Project[]>;
    deletProject(id: string, uid: string): Promise<void>;
    getOneProject(id: string, uid: string): Observable<Project>;
    editCard(id: string, uid: string, title: string): Promise<void>;
    editContent(courseID: string, uid: string, content: string): Promise<void>;
    getAllLectures(courseID: string, chapterID: string): Observable<Lecture[]>;
    getFirstLecture(courseID: string, chapterId: string): Observable<string>;
    addNewLecture(courseID: string, chapterID: string, data: {
        title: string;
        seqNo: number;
    }): Promise<unknown>;
    editLectureDetails(courseID: string, chapterID: string, lectureID: string, data: any): Promise<unknown>;
    deleteLecture(courseID: string, chapterID: string, lectureID: string): Promise<unknown>;
    getAllSlides(courseID: string, chapterID: string, lectureID: string): Observable<Ss[]>;
    addSlide(courseID: string, chapterID: string, lectureID: string, data: Ss): Promise<unknown>;
    editSlide(courseID: string, chapterID: string, lectureID: string, slideID: string, data: any): Promise<unknown>;
    deleteSlide(courseID: string, chapterID: string, lectureID: string, slideID: string): Promise<unknown>;
    getFirstCourse(): Observable<{
        id: string;
    }>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CoursesService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CoursesService>;
}
