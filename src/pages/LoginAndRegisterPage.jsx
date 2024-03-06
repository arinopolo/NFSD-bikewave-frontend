import { useState } from "react";
import LoginForm from "../components/loginForm/LoginForm";
import LogoComponent from "../components/LogoComponent";
import RegisterForm from "../components/register/RegisterForm";
import "../styles/LoginPage.css";


// eslint-disable-next-line react/prop-types
const LoginAndRegisterPage = () => {
  const [showLoginForm, setShowLoginForm] = useState(true);

  const toggleLoginForm = () => {
    setShowLoginForm((prevShowLoginForm) => !prevShowLoginForm);
  };

  return (
    <div className="flex flex-column align-center gap-2 justify-center h-100 w-100">
      <LogoComponent />

      {showLoginForm ? (
        <LoginForm toggle={toggleLoginForm} />
      ) : (
        <RegisterForm toggle={toggleLoginForm} />
      )}
    </div>
  );
};

export default LoginAndRegisterPage;
