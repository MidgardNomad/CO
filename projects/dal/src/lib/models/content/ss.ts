export interface Ss {
  id?: string;
  seqNo: number;
  type: SsType;
  text?: string;
  image?: string;
  question?: string;
  answer?: number;
  options?: string[];
}

// create type enum
export enum SsType {
  Text = 'text',
  TextImage = 'text-image',
  MCQ = 'mcq',
  QFill = 'q-fill',
}
