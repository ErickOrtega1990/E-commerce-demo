import { createContext } from "react";

type sessionContextType = {
  isLogged: boolean;
  changeLoginState: (state: boolean) => void;
};

export default createContext<sessionContextType>({} as sessionContextType);
