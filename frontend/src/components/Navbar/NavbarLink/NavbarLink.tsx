import { useEffect, useState, type ReactNode } from "react";
import style from "./NavbarLink.module.css";
import { Link, Navigate, useNavigate } from "react-router-dom";

type Props = {
  href: string;
  type: "link" | "login" | "register";
  children: ReactNode;
};

function NavbarLink({ href, type, children }: Props) {
  const [classStyle, setClassStyle] = useState<string>("link");
  const navigate = useNavigate();

  useEffect(() => {
    switch (type) {
      case "link":
        setClassStyle(style.link);
        break;
      case "login":
        setClassStyle(style.login);
        break;
      case "register":
        setClassStyle(style.register);
        break;
    }
  }, []);

  return (
    <Link className={classStyle} to={href}>
      {children}
    </Link>
  );
}

export default NavbarLink;
