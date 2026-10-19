import { useForm, type FieldValues } from "react-hook-form";
import style from "./LoginForm.module.css";
import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import sessionContext from "../../../context/Session";

const url = import.meta.env.VITE_LOGIN_URL;

function LoginForm() {
  const { register, handleSubmit } = useForm();
  const [isPending, setIsPending] = useState<boolean>(false);
  const { changeLoginState } = useContext(sessionContext);

  const mutation = useMutation({
    mutationFn: async (data: FieldValues) => {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }
      changeLoginState(true);
      return response.json();
    },
  });

  const submitHandler = async (data: FieldValues) => {
    setIsPending(true);
    mutation.mutate(data);
  };

  return (
    <form
      className={style.form}
      onSubmit={handleSubmit((data) => submitHandler(data))}
    >
      <div className={style.textContainer}>
        <h1 className={style.h1}>¡Hola!</h1>
        <h2 className={style.h2}>¡Nos alegra tenerte aquí!</h2>
      </div>

      <div className={style.inputContainer}>
        <input
          className={style.input}
          type="email"
          {...register("email")}
          id="email"
          placeholder="Ingresa tu correo electrónico"
          required={true}
          autoComplete="off"
        />
        <input
          className={style.input}
          type="password"
          {...register("password")}
          id="password"
          placeholder="Ingresa tu contraseña"
          required={true}
          autoComplete="off"
        />

        <a href="#" className={style.a}>
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      <button type="submit" className={style.button}>
        Ingresar
      </button>
    </form>
  );
}

export default LoginForm;
