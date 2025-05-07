import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import { ContextType, ProfileData, Schedule, Students } from "./contextType.ts";
import { getSchedule, getStudents } from "../api/apiRequest.ts";

const Context = createContext<ContextType>({} as ContextType);
const useGetGlobalContext = () => useContext(Context);
const ContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [students, setStudents] = useState<Students[]>([]);
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [num, setNum] = useState(1);

  const fetchSchedule = useCallback(async (groupID: number) => {
    const { data } = await getSchedule(groupID);
    setSchedule(
      data.map((el) => ({
        ...el,
        subjects: el.subjects.sort((a, b) => a.lessonNumber - b.lessonNumber),
      })),
    );
  }, []);
  const fetchStudents = useCallback(async (groupID: number) => {
    const { data } = await getStudents(groupID);
    setStudents(data);
  }, []);

  const values: ContextType = {
    profile: profile!,
    setProfile,
    fetchSchedule,
    schedule,
    num,
    setNum,
    students,
    fetchStudents,
  };

  return <Context.Provider value={values}>{children}</Context.Provider>;
};
export { Context, ContextProvider, useGetGlobalContext };
