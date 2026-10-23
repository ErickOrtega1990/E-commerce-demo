import style from "./Navbar.module.css";
import ToggleButton from "./ToogleButton/ToggleButton";
import NavbarContent from "./NavbarContent";
import Logo from "./Logo/Logo";
import { useEffect, useState } from "react";
import useRefreshSession from "../../hooks/useRefreshSession";

type Props = {};

const show = {
  height: "auto",
  overflow: "scroll",
  opacity: "1",
};

function Navbar1({}: Props) {
  const [showBar, setShowBar] = useState(false);
  const refresh = useRefreshSession();

  useEffect(() => {
    refresh;
  }, []);

  const showBarHandler = () => {
    setShowBar(!showBar);
  };

  return (
    <>
      <ToggleButton setShowBar={showBarHandler} showBar={showBar} />
      <div className={style.navbar}>
        <Logo />
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
