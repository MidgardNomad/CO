import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Course } from '../models/content/course';
import { Chapter } from '../models/content/chapter';
import { Lecture } from '../models/content/lecture';
import { Ss } from '../models/content/ss';
import { Observable, map, pipe, retry, tap } from 'rxjs';
import { Projects } from '../models/project';
import { ContentProject } from '../models/content-project';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private _coursesCollection = 'courses';
  private _chaptersCollection = 'chapters';
  private _lecturesCollection = 'lectures';
  private _slidesCollection = 'slides';
  constructor(private crudSerive: CrudService) {}

  //Courses Methods:
  getAllCourses(): Observable<Course[]> {
    return this.crudSerive
      .getDataByOrder(this._coursesCollection, 'seqNo')
      .pipe(
        map((docSnapShots) => {
          return docSnapShots.map((docSnap) => {
            return <Course>{
              id: docSnap.payload.doc.id,
              ...(docSnap.payload.doc.data() as object),
            };
          });
        })
      );
  }

  getCourse(courseID: string): Observable<Course> {
    return this.crudSerive.getSignleDoc(this._coursesCollection, courseID).pipe(
      map((courseDocSnap) => {
        return <Course>{
          id: courseDocSnap.id,
          ...(courseDocSnap.data() as object),
        };
      })
    );
  }

  async createNewCourse(courseTitle: string, courseDescription: string) {
    return new Promise((resolve, reject) => {
      this.crudSerive
        .addData(this._coursesCollection, {
          title: courseTitle,
          description: courseDescription,
        } as Course)
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }

  async editCourse(courseID: string, data: any) {
    return new Promise((resolve, reject) => {
      this.crudSerive
        .updateData(this._coursesCollection, courseID, data)
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }

  async deleteCourse(courseID: string) {
    return new Promise((resolve, reject) => {
      this.crudSerive
        .deleteData(this._coursesCollection, courseID)
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }

  //---------------------------------------------------------------------
  //Chapters Methods:
  //---------------------------------------------------------------------

  //Get all chapters
  getChapters(courseID: string): Observable<Chapter[]> {
    return this.crudSerive
      .getDataByOrder(
        `/${this._coursesCollection}/${courseID}/${this._chaptersCollection}`,
        'seqNo'
      )
      .pipe(
        map((docSnaps) => {
          return docSnaps.map((snap) => {
            return <Chapter>{
              id: snap.payload.doc.id,
              ...(snap.payload.doc.data() as object),
            };
          });
        })
      );
  }

  //Get chapter ID by seqNo: 1
  getFirstChapter(courseID: string) {
    return this.crudSerive
      .getSingleDataByField(
        `/${this._coursesCollection}/${courseID}/${this._chaptersCollection}`,
        'seqNo',
        1
      )
      .pipe(
        map((chapterDocSnap) => {
          return chapterDocSnap[0].payload.doc.id;
        })
      );
  }

  async createNewCourseChapter(
    courseID: string,
    data: { title: string; description: string; seqNo: number }
  ) {
    return new Promise((resolve, reject) => {
      this.crudSerive
        .addDataToSubCollection(
          `/${this._coursesCollection}/${courseID}/${this._chaptersCollection}`,
          data
        )
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }

  async editChapterDetails(courseID: string, chapterID: string, data: any) {
    return new Promise((resolve, reject) => {
      this.crudSerive
        .updateData(
          `/${this._coursesCollection}/${courseID}/${this._chaptersCollection}`,
          chapterID,
          data
        )
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }

  async deleteChapter(courseID: string, chapterID: string) {
    return new Promise((resolve, reject) => {
      this.crudSerive
        .deleteData(
          `/${this._coursesCollection}/${courseID}/${this._chaptersCollection}`,
          chapterID
        )
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }

  //---------------------------------------------------------------------
  //Projects Methods:
  //---------------------------------------------------------------------
  // add Project
  addProjects(
    id: string,
    data: { title: string; content: string; image: any }
  ) {
    this.crudSerive.addData(`courses/${id}/project`, data);
  }
  // Get Data From Collection Project
  getDataProject(id: string) {
    return this.crudSerive.getData(`courses/${id}/project`).pipe(
      map((data) => {
        return data.map((ele) => {
          return {
            id: ele.payload.doc.id,
            ...(ele.payload.doc.data() as object),
          } as Projects;
        });
      })
    );
  }
  // delet Project
  deletProject(id: string, uid: string) {
    return this.crudSerive.deleteData(`courses/${id}/project`, uid);
  }
  // getOne For card Project
  getOneProject(id: string, uid: string) {
    return this.crudSerive.getSignleDoc(`courses/${id}/project`, uid).pipe(
      map((projectDocSnap) => {
        return { ...(projectDocSnap.data() as object) } as ContentProject;
      })
    );
  }
  //  Edit Card For Project
  editCard(id: string, uid: string, title: string) {
    return this.crudSerive.updateData(`courses/${id}/project`, uid, { title });
  }
  //  Edit Content inside Project
  editContent(courseID: string, uid: string, content: string) {
    return this.crudSerive.updateData(`courses/${courseID}/project/`, uid, {
      content,
    });
  }
  //---------------------------------------------------------------------

  //---------------------------------------------------------------------
  //Lectures Methods:
  //---------------------------------------------------------------------
  getAllLectures(courseID: string, chapterID: string): Observable<Lecture[]> {
    return this.crudSerive
      .getDataByOrder(
        `/${this._coursesCollection}/${courseID}/${this._chaptersCollection}/${chapterID}/${this._lecturesCollection}`,
        'seqNo'
      )
      .pipe(
        map((docSnaps) => {
          return docSnaps.map((doc) => {
            return <Lecture>{
              id: doc.payload.doc.id,
              ...(doc.payload.doc.data() as Object),
            };
          });
        })
      );
  }

  getFirstLecture(courseID: string, chapterId: string) {
    return this.crudSerive
      .getSingleDataByField(
        `/${this._coursesCollection}/${courseID}/${this._chaptersCollection}/${chapterId}/${this._lecturesCollection}`,
        'seqNo',
        1
      )
      .pipe(
        map((docSnaps) => {
          return docSnaps[0].payload.doc.id;
        })
      );
  }

  async addNewLecture(
    courseID: string,
    chapterID: string,
    data: { title: string; seqNo: number }
  ) {
    return new Promise((resolve, reject) => {
      this.crudSerive
        .addDataToSubCollection(
          `/${this._coursesCollection}/${courseID}/${this._chaptersCollection}/${chapterID}/${this._lecturesCollection}`,
          data
        )
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }

  async editLectureDetails(
    courseID: string,
    chapterID: string,
    lectureID: string,
    data: any
  ) {
    return new Promise((resolve, reject) => {
      this.crudSerive
        .updateData(
          `/${this._coursesCollection}/${courseID}/${this._chaptersCollection}/${chapterID}/${this._lecturesCollection}`,
          lectureID,
          data
        )
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }
  async deleteLecture(courseID: string, chapterID: string, lectureID: string) {
    return new Promise((resolve, reject) => {
      this.crudSerive
        .deleteData(
          `/${this._coursesCollection}/${courseID}/${this._chaptersCollection}/${chapterID}/${this._lecturesCollection}`,
          lectureID
        )
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }

  //Slides Methods:
  getAllSlides(
    courseID: string,
    chapterID: string,
    lectureID: string
  ): Observable<Ss[]> {
    return this.crudSerive
      .getDataByOrder(
        `/${this._coursesCollection}/${courseID}/${this._chaptersCollection}/${chapterID}/${this._lecturesCollection}/${lectureID}/${this._slidesCollection}`,
        'seqNo'
      )
      .pipe(
        map((docSnaps) => {
          return docSnaps.map((docSnap) => {
            return <Ss>{
              id: docSnap.payload.doc.id,
              ...(docSnap.payload.doc.data() as object),
            };
          });
        })
      );
  }

  async addSlide(
    courseID: string,
    chapterID: string,
    lectureID: string,
    data: Ss
  ) {
    return new Promise((resolve, reject) => {
      this.crudSerive
        .addDataToSubCollection(
          `/${this._coursesCollection}/${courseID}/${this._chaptersCollection}/${chapterID}/${this._lecturesCollection}/${lectureID}/${this._slidesCollection}`,
          data
        )
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }

  async editSlide(
    courseID: string,
    chapterID: string,
    lectureID: string,
    slideID: string,
    data: any
  ) {
    return new Promise((resolve, reject) => {
      this.crudSerive
        .updateData(
          `/${this._coursesCollection}/${courseID}/${this._chaptersCollection}/${chapterID}/${this._lecturesCollection}/${lectureID}/${this._slidesCollection}`,
          slideID,
          data
        )
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }

  async deleteSlide(
    courseID: string,
    chapterID: string,
    lectureID: string,
    slideID: string
  ) {
    return new Promise((resolve, reject) => {
      this.crudSerive
        .deleteData(
          `/${this._coursesCollection}/${courseID}/${this._chaptersCollection}/${chapterID}/${this._lecturesCollection}/${lectureID}/${this._slidesCollection}`,
          slideID
        )
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }

  getFirstCourse(){
    return this.crudSerive.getSingleDataAsc(this._coursesCollection);
    // return new Promise((resolve,reject)=>{
    // })
  }
}
