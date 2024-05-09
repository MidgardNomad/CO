export interface Ss {
    id: string;
    type: SsType;
    text: string;
    title: string;
    image: string;
    question: string;
    answer: number;
    options: string[];

}


// create type enum
export enum SsType {
    Text= 'text',
    TextImage= 'text-image',
    QMC= 'qmc',
    QFill= 'q-fill',

}

