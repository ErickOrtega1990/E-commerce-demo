import type { ReactNode } from "react";
import style from "./FormsContainer.module.css";
import bgImage from "../../../public/img/forms/session1.png";
import SliderContent from "./RegisterForm/SliderContent/SliderContent";

type Props = { action: "login" | "register"; children: ReactNode };

const bgImg = () => ({
  backgroundImage: `url(${bgImage})`,
});

function FormsContainer({ action, children }: Props) {
  return (
    <>
      <div className={style.formContainer}>
        <div
          className={action === "login" ? style.sliderLeft : style.sliderRight}
          style={bgImg()}
        >
          <SliderContent action={action} />
        </div>
        {children}
      </div>
    </>
  );
}

export default FormsContainer;
