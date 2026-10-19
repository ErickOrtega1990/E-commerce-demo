import { useEffect, useState } from "react";
import style from "./ToggleButton.module.css";

type Props = {
  setShowBar: () => void;
  showBar: boolean;
};

function ToggleButton({ setShowBar, showBar }: Props) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(showBar);
  }, [showBar]);

  return (
    <div className={style.toggleButton} onClick={setShowBar}>
      <hr className={isActive ? style.l1x : style.l1} />
      <hr className={isActive ? style.l2x : style.l2} />
      <hr className={isActive ? style.l3x : style.l3} />
    </div>
  );
}

export default ToggleButton;
