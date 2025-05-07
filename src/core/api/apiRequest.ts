import { AxiosResponse } from "axios";
import { instance } from ".";
import { ProfileData, Schedule, Students } from "../context/contextType";
import { AuthData } from "./types";

const apiRequest = async (data: AuthData) => {
  return await instance.post<AuthData, AxiosResponse<ProfileData>>(
    "api/v1/auth/login",
    data,
  );
};
const getSchedule = async (groupNum: number) => {
  return await instance.get<Schedule[]>(`api/v1/group/${groupNum}/schedule`);
};
const getStudents = async (groupNum: number) => {
  return await instance.get<Students[]>(`api/v1/group/${groupNum}/students`);
};
const getPresence = async (groupNum: number) => {
  return await instance.get(`api/v1/group/${groupNum}/presence`);
};
export { apiRequest, getSchedule, getStudents, getPresence };
