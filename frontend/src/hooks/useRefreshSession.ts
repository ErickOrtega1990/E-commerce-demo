import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

function useRefreshSession() {
  const [logged, setLogged] = useState<boolean>(false);
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(import.meta.env.VITE_CHECK_SESSION_URL, {
        method: "POST",
        credentials: "include",
      });

      response.status !== 200 ? setLogged(false) : setLogged(true);
    },
  });

  useEffect(() => {
    mutation.mutate();
  }, [logged]);

  return logged;
}

export default useRefreshSession;
