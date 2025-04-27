import { AxiosResponse } from "axios";
import { instance } from ".";
import {ProfileData} from "../context/contextType";
import { AuthData } from "./types";

const loginApi = async (data: AuthData) => {
  return await instance.post<AuthData, AxiosResponse<ProfileData>>("api/v1/auth/login", data);
};
const getSchedule = async()=>{
  return await instance.get("api/v1/group/1/schedule");
}

export { loginApi,getSchedule };
