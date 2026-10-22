import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import sessionContext from "../context/Session";

type Props = {};

function AuthotizedUser({}: Props) {
  const { isLogged } = useContext(sessionContext);
  useEffect(() => {}, [isLogged]);

  if (!isLogged) {
    return <Navigate to="/"></Navigate>;
  }

  return (
    <>
      <Outlet />
    </>
  );
}

export default AuthotizedUser;
