import { Link } from "react-router-dom";
import style from "./SliderContent.module.css";
import google from "../../../../../public/img/network/googleIcon.webp";

type Props = { action: "login" | "register" };

function SliderContent({ action }: Props) {
  return (
    <>
      <div className={style.container}>
        {action === "register" ? (
          <>
            <h1 className={style.h1}>Crea tu nueva cuenta.</h1>
            <p className={style.p}>
              O si ya tienes una, puedes iniciar sesión{" "}
              <Link to={"/session/login"} className={style.link}>
                aquí.
              </Link>
            </p>
          </>
        ) : (
          <>
            <h1 className={style.h1}>Ingresa a tu cuenta.</h1>
            <p className={style.p}>
              Si no tienes una, puedes crearla{" "}
              <Link to={"/session/register"} className={style.link}>
                aquí.
              </Link>
            </p>
          </>
        )}
        <p className={style.p}>
          También puedes iniciar sesión usando tu cuenta de Google.
        </p>
        <img src={google} className={style.icon}></img>
      </div>
    </>
  );
}

export default SliderContent;
