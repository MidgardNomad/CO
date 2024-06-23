export type SlideData =
  | {
      text: string;
    }
  | {
      text: string;
      photoURL: string;
    }
  | {
      text: string;
      answer: number;
      options: string[];
    }
  | {
      text: string;
      answer: string;
    };
