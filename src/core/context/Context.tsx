import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import { ContextType, ProfileData, Schedule } from "./contextType.ts";
import { getSchedule } from "../api/login-api.ts";

const Context = createContext<ContextType>({} as ContextType);
const useGetGlobalContext = () => useContext(Context);
const ContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [num, setNum] = useState(0);

  const fetchSchedule = useCallback(async (groupID: number) => {
    const { data } = await getSchedule(groupID);
    setSchedule(
      data.map((el) => ({
        ...el,
        subjects: el.subjects.sort((a, b) => a.lessonNumber - b.lessonNumber),
      })),
    );
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
