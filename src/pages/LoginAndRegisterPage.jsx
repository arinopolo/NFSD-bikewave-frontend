import { useState } from "react";
import BottomNavigation from "../components/navigation/BottomNavigation";
import LoginForm from "../components/LoginForm";
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
    <div className="login-page-container">
      <LogoComponent />

      {showLoginForm ? (
        <LoginForm toggle={toggleLoginForm} />
      ) : (
        <RegisterForm toggle={toggleLoginForm} />
      )}

      <BottomNavigation />
    </div>
  );
};

export default LoginAndRegisterPage;