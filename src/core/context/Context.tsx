import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import {
  ContextType,
  Presence,
  ProfileData,
  Schedule, Statistic,
  Students,
} from "./contextType.ts";
import {getPresence, getSchedule, getStatistic, getStudents} from "../api/apiRequest.tsx";

const Context = createContext<ContextType>({} as ContextType);
const useGetGlobalContext = () => useContext(Context);
const ContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [students, setStudents] = useState<Students[]>([]);
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [num, setNum] = useState(1);
  const [presences, setPresences] = useState<Presence[]>([]);
  const [statistic,setStatistic] = useState<Statistic[]>([])

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
  const fetchPresence = useCallback(async (groupID: number) => {
    const { data } = await getPresence(groupID);
    const sortData = data.sort((a, b) =>
      a.presenceDate.localeCompare(b.presenceDate),
    );
    setPresences(sortData);
  }, []);
  const fetchStatistic = useCallback(async (groupID: number) => {
    const { data } = await getStatistic(groupID);
    setStatistic(data);
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
    presences,
    fetchPresence,
    statistic,
    fetchStatistic
    }
  return <Context.Provider value={values}>{children}</Context.Provider>;
  };



export { Context, ContextProvider, useGetGlobalContext };
