export interface CourseLevel {
  courseId: string;
  chapterLevel: ChapterLevel[];
}

export interface ChapterLevel {
  chapterId: string;
  finished: Date;
  lectureLevel: LectureLevel[];
}

export interface LectureLevel {
  lectureId: string;
  finished: Date;
}

/* 
interface finished {
  chapterLevel: {
    chapterId: this will always add the first chapter on enroll
    finished: Date
    lectureLevel: [{
      lectureID: By defalut this should be an empty list and add to it as the user progresses in the chapter
      finished: Date
    }]
  }
}
*/

// export interface chapterLevel {
// chapterId: string,
// isDone: boolean,
// }
