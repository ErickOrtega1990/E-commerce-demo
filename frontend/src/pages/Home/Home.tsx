import { useContext, useEffect } from "react";
import sessionContext from "../../context/Session";
import useRefreshSession from "../../hooks/useRefreshSession";

function Home() {
  const { changeLoginState } = useContext(sessionContext);
  const logged = useRefreshSession();

  changeLoginState(logged);

  return (
    <>
      <h1>Home</h1>
    </>
  );
}

export default Home;
