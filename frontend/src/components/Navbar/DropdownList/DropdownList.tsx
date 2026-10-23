import type { ReactNode } from "react";
import style from "./DropdownList.module.css";
import NavbarLink from "../NavbarLink/NavbarLink";

type Props = { title: string; children: ReactNode; childrenNumber: number };

function DropdownList({ children, title }: Props) {
  return (
    <div className={style.dropdownContainer}>
      <NavbarLink href="#">{title}</NavbarLink>
      <div className={style.dropdownList}>{children}</div>
    </div>
  );
}

export default DropdownList;
