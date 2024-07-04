export interface Lecture {
  id: string;
  title: string;
  description: string;
  seqNo: number;
  type?: LectureType;
}

export enum LectureType {
  Learn = 'learn',
  Admin = 'admin',
  Mentor = 'mentor',
  Interview = 'interview',
}
