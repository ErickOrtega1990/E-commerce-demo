import { useParams } from "react-router-dom";
import style from "./Session.module.css";
import FormsContainer from "../../components/UserForm/FomrsContainer";
import RegisterForm from "../../components/UserForm/RegisterForm/RegisterForm";
import LoginForm from "../../components/UserForm/LoginForm/LoginForm";

type Props = {};

function Session({}: Props) {
  const params = useParams();

  return (
    <div className={style.section}>
      <FormsContainer action={params.action as string}>
        <RegisterForm />
        <LoginForm />
      </FormsContainer>
    </div>
  );
}

export default Session;
