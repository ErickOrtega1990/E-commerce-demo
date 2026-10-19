import { useContext } from "react";
import NavbarLink from "./NavbarLink/NavbarLink";
import sessionContext from "../../context/Session";

type Props = {};

function NavbarContent({}: Props) {
  const { isLogged } = useContext(sessionContext);

  return (
    <>
      {isLogged ? (
        <>
          <NavbarLink href="/session/register" type="register">
            Mi cuenta
          </NavbarLink>
          <NavbarLink href="/session/login" type="login">
            Cerrar sesión
          </NavbarLink>
        </>
      ) : (
        <>
          <NavbarLink href="/session/register" type="register">
            Crea una cueta
          </NavbarLink>
          <NavbarLink href="/session/login" type="login">
            Ingresa aquí
          </NavbarLink>
        </>
      )}
    </>
  );
}

export default NavbarContent;
