export interface Ss {
    id?: string;
    seqNo: number;
    type: SsType;
    text?: string;
    image?: string;
    question?: string;
    mcqAnswer?: number;
    qAnswer?: string;
    options?: string[];
}
export declare enum SsType {
    Text = "text",
    TextImage = "text-image",
    MCQ = "mcq",
    QFill = "q-fill"
}
