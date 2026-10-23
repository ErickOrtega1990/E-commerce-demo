import { useMutation } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import sessionContext from "../context/Session";

function useRefreshSession() {
  const { changeLoginState } = useContext(sessionContext);

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(import.meta.env.VITE_CHECK_SESSION_URL, {
        method: "POST",
        credentials: "include",
      });
      return res.status;
    },
    onSuccess: (code) => {
      code === 200
        ? console.log(changeLoginState(true))
        : changeLoginState(false);
    },
  });

  useEffect(() => {
    mutation.mutate();
  }, []);
}

export default useRefreshSession;
