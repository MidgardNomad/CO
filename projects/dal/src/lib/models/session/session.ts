export interface Session {
  sessionId: string;
  mentorId: string;
  userId: string;
  sessionDate: Date;
  sessionTime: Date;
  sessionDuration: number;
  sessionStatus: string;
  sessionType: string;
  sessionPrice: number;
}
