type ContextType = {
  profile: ProfileData;
  setProfile: (profile: ProfileData) => void;
  num: number;
  setNum: (num: number) => void;
  schedule: Schedule[];
  fetchSchedule(groupID: number): Promise<void>;
  students: Students[];
  fetchStudents(groupID: number): Promise<void>;
  presences: Presence[];
  fetchPresence(groupID: number): Promise<void>;
};
type Presence = {
  presenceDate: string;
  subjects: PresenceSubjects[];
};
type PresenceSubjects = {
  dayOfWeek: DayOfWeek;
  presenceRow: PresenceRow[];
};
type PresenceRow = {
  presenceId: number;
  schedule: Subjects;
  attendanceTypeId: AttendanceType;
  studentId: number;
};
type Students = {
  studentId: number;
  uuid: string;
  email: string;
  number: string;
  fio: string;
  enrollDate: string;
};
export enum AttendanceType {
  "Б" = 1,
  "С" = 2,
  "О" = 3,
  "П" = 4,
}
export enum DayOfWeek {
  "Понедельник" = 1,
  "Вторник" = 2,
  "Среда" = 3,
  "Четверг" = 4,
  "Пятница" = 5,
  "Суббота" = 6,
}
type Token = {
  token: string;
};
type ProfileData = {
  user: UserData;
  token: Token;
};
type UserData = {
  email: string;
  fio: string;
  number: string;
  responsible: [Responsible];
  role: Role;
  uuid: string;
};
type Responsible = {
  group: Group;
  responsibleType: ResponsibleType;
};
type Group = {
  id: number;
  name: string;
};
type ResponsibleType = {
  id: number;
  name: string;
};
type Role = {
  id: number;
  name: string;
};
type Schedule = {
  dayOfWeek: DayOfWeek;
  subjects: Subjects[];
};
type Subjects = {
  id: number;
  lessonNumber: number;
  audience: string;
  subject: Subject;
};
type Subject = {
  id: number;
  name: string;
};
export type {
  Presence,
  Role,
  ContextType,
  Group,
  ProfileData,
  Responsible,
  ResponsibleType,
  Token,
  UserData,
  Schedule,
  Students,
};
