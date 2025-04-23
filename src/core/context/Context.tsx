import { createContext, FC, ReactNode, useContext } from "react";
import { ContextType } from "./contextType.ts";

const Context = createContext<ContextType>({} as ContextType);

const useGetGlobalContext = () => useContext(Context);
const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const values: ContextType = {};

  return <Context.Provider value={values}>{children}</Context.Provider>;
};
export { Context, ContextProvider, useGetGlobalContext };
