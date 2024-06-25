import { Injectable } from "@angular/core";
import { CrudService } from "./crud.service";
import { Cp } from '../models/content/cp'
import { Observable, map } from "rxjs";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Course } from "DAL";

@Injectable({
    providedIn: "root"
})

export class CareerPathService {
    constructor(private crudService: CrudService) { }

    // Career Path Collection

    getAllCareerPaths(): Observable<Cp[]> {
        return this.crudService.getData('career-path').pipe(
            map(docSnaps => {
                return docSnaps.map(docSnap => {
                    return <Cp>{
                        id: docSnap.payload.doc.id,
                        ...docSnap.payload.doc.data() as object
                    }
                })
            })
        )
    }

    async addNewCareerPath(title: string, description: string) {
        return new Promise((resolve, reject) => {
            this.crudService.addData('career-path', {
                title,
                description
            })
                .then(res => resolve(res))
                .catch(error => reject(error))
        })
    }

    async updateCareerPath(ID: any, title: string, description: string) {
        return new Promise((resolve, reject) => {
            this.crudService.updateData('career-path', ID, {
                title,
                description
            })
                .then(res => resolve(res))
                .catch(error => reject(error))
        })
    }

    async deleteCareerPath(cpID: string) {
        return new Promise((resolve, reject) => {
            this.crudService.deleteData('career-path', cpID)
                .then(res => resolve(res))
                .catch(error => reject(error))
        })
    }

    // Courses SubCollection

    getAllCareerCourses(careerID: string) {
        return this.crudService.getData(`/career-path/${careerID}`).pipe(map(
            careerDocSnaps => {
                return careerDocSnaps.map(careerDoc => {
                    return <Course> {
                        id: careerDoc.payload.doc.id,
                        ...careerDoc.payload.doc.data() as object
                    }
                })
            }
        ))
    }

}