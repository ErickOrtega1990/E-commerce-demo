import { useForm, type FieldValues } from "react-hook-form";
import style from "./LoginForm.module.css";
import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import sessionContext from "../../../context/Session";
import { useNavigate } from "react-router-dom";
import Loading from "../status/Loading/Loading";

const url = import.meta.env.VITE_LOGIN_URL;

function LoginForm() {
  const { register, handleSubmit, reset } = useForm();
  const [isPending, setIsPending] = useState<boolean>(false);
  const { changeLoginState } = useContext(sessionContext);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data: FieldValues) => {
      setIsPending(true);
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      setIsPending(false);
      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }
      changeLoginState(true);

      return navigate("/account");
    },
  });

  const submitHandler = async (data: FieldValues) => {
    setIsPending(true);
    mutation.mutate(data);
    reset();
  };

  if (isPending) return <Loading side="right" />;

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

      <button disabled={isPending} type="submit" className={style.button}>
        {isPending ? "Enviando..." : "Ingresar"}
      </button>
    </form>
  );
}

export default LoginForm;
