import { useForm, type FieldValues } from "react-hook-form";
import style from "./RegisterForm.module.css";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const url = import.meta.env.VITE_REGISTER_URL;

function RegisterForm() {
  const { register, handleSubmit, reset } = useForm();
  const [isPending, setIsPending] = useState<boolean>(false);

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

      return response.json();
    },
  });

  const submitHandler = async (data: FieldValues) => {
    setIsPending(true);
    mutation.mutate(data);
    reset();
  };

  return (
    <form
      className={style.form}
      onSubmit={handleSubmit((data) => submitHandler(data))}
    >
      <div className={style.textContainer}>
        <h1 className={style.h1}>¡Hola!</h1>
        <h2 className={style.h2}>¡Te damos la bienvenida!</h2>
      </div>

      <div className={style.inputContainer}>
        <input
          className={style.input}
          type="text"
          {...register("name")}
          id="name"
          placeholder="Ingresa tu nombre"
          required={true}
          autoComplete="off"
        />
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
        <input
          className={style.input}
          type="password"
          {...register("passwordRepeat")}
          id="passwordRepeat"
          placeholder="Repite tu contraseña"
          required={true}
          autoComplete="off"
        />
      </div>

      <a href="#" className={style.a}>
        Términos y condiciones
      </a>

      <div className={style.checkContainer}>
        <input
          type="checkbox"
          id="conditions"
          {...register("conditions")}
        ></input>
        <label className={style.label} htmlFor="conditions">
          Acepto los términos y condiciones.
        </label>
      </div>

      <button type="submit" className={style.button}>
        Crear cuenta
      </button>
    </form>
  );
}

export default RegisterForm;
