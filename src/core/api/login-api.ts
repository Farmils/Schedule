import { AxiosResponse } from "axios";
import { instance } from ".";
import { ProfileData, Schedule } from "../context/contextType";
import { AuthData } from "./types";

const loginApi = async (data: AuthData) => {
  return await instance.post<AuthData, AxiosResponse<ProfileData>>(
    "api/v1/auth/login",
    data,
  );
};
const getSchedule = async (groupNum: number) => {
  return await instance.get<Schedule[]>(`api/v1/group/${groupNum}/schedule`);
};
const getStudents = async (groupNum: number) => {
  return await instance.get(`api/v1/group/${groupNum}/students`);
};
// const postSchedule = async (data: SetPresence) => {
//   return await instance.post<SetPresence>("api/v1/presence", data);
// };

export { loginApi, getSchedule, getStudents };
