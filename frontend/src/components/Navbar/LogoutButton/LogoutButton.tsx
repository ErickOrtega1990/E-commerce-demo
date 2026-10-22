import { useMutation } from "@tanstack/react-query";
import style from "./LogoutButton.module.css";
import sessionContext from "../../../context/Session";
import { useContext } from "react";

type Props = {};

const url = import.meta.env.VITE_LOGOUT_URL;

function LogoutButton({}: Props) {
  const { isLogged, changeLoginState } = useContext(sessionContext);

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.status === 200 || response.status === 401) {
        changeLoginState(false);
      }
      return await response.json();
    },
  });

  return (
    <button
      className={style.button}
      onClick={() => {
        mutation.mutate();
      }}
    >
      Cerrar sesión
    </button>
  );
}

export default LogoutButton;
