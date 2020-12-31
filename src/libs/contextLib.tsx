import { useContext, createContext } from "react";

interface IAppContext {
  isAuthenticated: boolean;
  userHasAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<IAppContext>({
  isAuthenticated: false,
});

export function useAppContext() {
  return useContext(AppContext);
}
