import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import {ContextType, ProfileData, Schedule} from "./contextType.ts";

const Context = createContext<ContextType>({} as ContextType);

const useGetGlobalContext = () => useContext(Context);
const ContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [schedule,setSchedule] = useState<Schedule | null >(null)

  // if (!profile) {
  //   console.log("Profile is null");
  //   return;
  // }

  const values: ContextType = {
    profile: profile!,
    setProfile,
    schedule: schedule!,
    setSchedule
  };

  return <Context.Provider value={values}>{children}</Context.Provider>;
};
export { Context, ContextProvider, useGetGlobalContext };
