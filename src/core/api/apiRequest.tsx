import { AxiosResponse } from "axios";
import { instance } from ".";
import {
  Presence,
  ProfileData,
  Schedule,
  Students,
} from "../context/contextType";
import { AuthData } from "./types";

const apiRequest = async (data: AuthData) => {
  return await instance
    .post<AuthData, AxiosResponse<ProfileData>>("api/v1/auth/login", data)
    .catch((err) => {
      console.log(err);
    });
};
const getSchedule = async (groupNum: number) => {
  return await instance
    .get<Schedule[]>(`api/v1/group/${groupNum}/schedule`)
    .catch((err) => {
      console.log(err);
    });
};
const getStudents = async (groupNum: number) => {
  return await instance
    .get<Students[]>(`api/v1/group/${groupNum}/students`)
    .catch((err) => {
      console.log(err);
    });
};
const getPresence = async (groupNum: number) => {
  return await instance
    .get<Presence[]>(`api/v1/group/${groupNum}/presence`)
    .catch((err) => {
      console.log(err);
    });
};
export { apiRequest, getSchedule, getStudents, getPresence };
