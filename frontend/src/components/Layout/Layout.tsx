import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import sessionContext from "../../context/Session";
import { useEffect, useState } from "react";
import useRefreshSession from "../../hooks/useRefreshSession";

type Props = {};

function Layout({}: Props) {
  const [isLogged, setIsLogged] = useState<boolean>(false);

  const changeLoginState = (state: boolean) => {
    setIsLogged(state);
  };

  return (
    <sessionContext.Provider
      value={{
        isLogged: isLogged,
        changeLoginState,
      }}
    >
      <Navbar />
      <Outlet />
    </sessionContext.Provider>
  );
}

export default Layout;
