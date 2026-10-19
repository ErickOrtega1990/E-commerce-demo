import style from "./Navbar.module.css";
import ToggleButton from "./ToogleButton/ToggleButton";
import { useState } from "react";
import NavbarContent from "./NavbarContent";

type Props = {};

const show = {
  height: "auto",
  overflow: "scroll",
  opacity: "1",
};

function Navbar1({}: Props) {
  const [showBar, setShowBar] = useState(false);

  const showBarHandler = () => {
    setShowBar(!showBar);
  };

  return (
    <>
      <ToggleButton setShowBar={showBarHandler} showBar={showBar} />
      <div className={style.navbar}>
        <div className={style.browserLinkContainer}>
          <NavbarContent />
        </div>
        <div
          className={style.mobileLinkContainer}
          style={showBar ? show : undefined}
        >
          <NavbarContent />
        </div>
      </div>
    </>
  );
}

export default Navbar1;
