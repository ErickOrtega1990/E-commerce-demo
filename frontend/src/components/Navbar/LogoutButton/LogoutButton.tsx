import { useMutation } from "@tanstack/react-query";
import style from "./LogoutButton.module.css";
import sessionContext from "../../../context/Session";
import { useContext } from "react";

type Props = {};

const url = import.meta.env.VITE_LOGOUT_URL;

function LogoutButton({}: Props) {
  const { changeLoginState } = useContext(sessionContext);

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      return response.status;
    },
  });

  return (
    <button
      className={style.button}
      onClick={async () => {
        const logoutResponse = await mutation.mutateAsync();
        if (logoutResponse === 200 || logoutResponse === 401) {
          changeLoginState(false);
        }
      }}
    >
      Cerrar sesión
    </button>
  );
}

export default LogoutButton;
