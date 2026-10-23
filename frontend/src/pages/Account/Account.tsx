import { useEffect } from "react";
import useRefreshSession from "../../hooks/useRefreshSession";

type Props = {};

function Account({}: Props) {
  const refresh = useRefreshSession();

  useEffect(() => {
    refresh;
  }, []);

  return <div>Account</div>;
}

export default Account;
