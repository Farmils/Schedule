import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { ContextType, ProfileData, Schedule } from "./contextType.ts";

const Context = createContext<ContextType>({} as ContextType);
const useGetGlobalContext = () => useContext(Context);
const ContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [monday, setMonday] = useState<Schedule[]>([]);
  const [tuesday, setTuesday] = useState<Schedule[]>([]);
  const [wednesday, setWednesday] = useState<Schedule[]>([]);
  const [thursday, setThursday] = useState<Schedule[]>([]);
  const [friday, setFriday] = useState<Schedule[]>([]);
  const [saturday, setSaturday] = useState<Schedule[]>([]);

  const values: ContextType = {
    profile: profile!,
    setProfile,
    schedule,
    setSchedule,
    monday,
    setMonday,
    tuesday,
    setTuesday,
    wednesday,
    setWednesday,
    thursday,
    setThursday,
    friday,
    setFriday,
    saturday,
    setSaturday,
  };

  return <Context.Provider value={values}>{children}</Context.Provider>;
};
export { Context, ContextProvider, useGetGlobalContext };
