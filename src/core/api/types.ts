type AuthData = {
  login: string;
  password: string;
};
type SetPresence = {
  studentId: number;
  scheduleRowId: number;
  presenceDate: Date;
  attendanceTypeId: number;
};

export type { AuthData, SetPresence };
