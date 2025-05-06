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
  DayOfWeek,
  ISchedule,
  ProfileData,
} from "./contextType.ts";
import { getSchedule } from "../api/login-api.ts";

const Context = createContext<ContextType>({} as ContextType);
const useGetGlobalContext = () => useContext(Context);
const ContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [schedule, setSchedule] = useState<ISchedule>({});
  const [num, setNum] = useState(0);

  const fetchSchedule = useCallback(async (groupID: number) => {
    const { data } = await getSchedule(groupID);
    console.log(data);

    const newSchedule: ISchedule = {
      [DayOfWeek.Понедельник]: [],
      [DayOfWeek.Вторник]: [],
      [DayOfWeek.Среда]: [],
      [DayOfWeek.Четверг]: [],
      [DayOfWeek.Пятница]: [],
      [DayOfWeek.Суббота]: [],
    };

    for (const { id, dayOfWeek, lessonNumber, audience, subject } of data) {
      newSchedule[dayOfWeek as DayOfWeek].push({
        id,
        lessonNumber,
        audience,
        subject,
      });
    }
    setSchedule(newSchedule);
  }, []);

  const values: ContextType = {
    profile: profile!,
    setProfile,
    fetchSchedule,
    schedule,
    num,
    setNum,
  };

  return <Context.Provider value={values}>{children}</Context.Provider>;
};
export { Context, ContextProvider, useGetGlobalContext };
