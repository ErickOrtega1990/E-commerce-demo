import style from "./Loading.module.css";

type Props = { side: "left" | "right" };

function Loading({ side }: Props) {
  return (
    <main
      className={
        side === "left"
          ? style.loadingContainerLeft
          : style.loadingContainerRight
      }
    >
      <div className={style.circle}>
        <div className={style.circle2}></div>
      </div>
      <h1 className={style.h1}>Esperando respuesta</h1>
    </main>
  );
}

export default Loading;
