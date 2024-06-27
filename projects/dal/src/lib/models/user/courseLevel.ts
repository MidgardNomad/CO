export interface courseLevel {
    courseId: string,
    lectureLevel: finished[] ,
    chapterLevel: finished[],
}


export interface finished {
id: string,
date: Date,
}


// export interface chapterLevel {
// chapterId: string,
// isDone: boolean,
// }