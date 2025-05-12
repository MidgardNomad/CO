import { CrudService } from './crud.service';
import { Cp } from '../models/content/cp';
import { Observable } from 'rxjs';
import { Course } from '../models/content/course';
import * as i0 from "@angular/core";
export declare class CareerPathService {
    private crudService;
    private _careerPathCollection;
    constructor(crudService: CrudService);
    getAllCareerPaths(): Observable<Cp[]>;
    addNewCareerPath(title: string, description: string): Promise<unknown>;
    addCourseToCareerPath(course: Course, careerPathID: string): Promise<unknown>;
    updateCareerPath(ID: any, title: string, description: string): Promise<unknown>;
    deleteCareerPath(cpID: string): Promise<unknown>;
    getAllCareerCourses(careerID: string): Observable<Course[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CareerPathService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CareerPathService>;
}
