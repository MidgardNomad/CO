export interface Chapter {
  id: string;
  title: string;
  description: string;
  seqNo: number;
  moduleQuiz: string; // module quiz id
  lectureList: string[]; // ss id list
}
