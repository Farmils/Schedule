type ContextType = {
  profile: ProfileData;
  setProfile: (profile: ProfileData) => void;
  schedule:Schedule;
  setSchedule: (schedule: Schedule) => void;
};

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
type Schedule={
  id: number;
  lessonNumber: number;
  audience: string;
  subject:Subject;
  dayOfWeek: number;
}
type Subject={
  id: number;
  name: string;
}
export type {
  Role,
  ContextType,
  Group,
  ProfileData,
  Responsible,
  ResponsibleType,
  Token,
  UserData,
  Schedule
};
