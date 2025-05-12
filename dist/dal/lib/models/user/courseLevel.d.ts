export interface CourseLevel {
    courseId: string;
    chapterLevel: ChapterLevel[];
    finished: Date;
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
