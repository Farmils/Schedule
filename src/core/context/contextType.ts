type ContextType = {
  profile: ProfileData;
  setProfile: (profile: ProfileData) => void;
  num: number;
  setNum: (num: number) => void;
  schedule: Schedule[];
  fetchSchedule(groupID: number): Promise<void>;
  students: Students[];
  fetchStudents(groupID: number): Promise<void>;
};
type Students = {
  studentId: number;
  uuid: string;
  email: string;
  number: string;
  fio: string;
  enrollDate: string;
};
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
