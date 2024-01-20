import { useState } from "react";
import BottomNavigation from "../components/BottomNavigation";
import LoginForm from "../components/LoginForm";
import LogoComponent from "../components/LogoComponent";
import RegisterForm from "../components/RegisterForm";
import "../styles/LoginPage.css";

// eslint-disable-next-line react/prop-types
const LoginAndRegisterPage = ({ setToken, token }) => {
  const [showLoginForm, setShowLoginForm] = useState(true);

  const toggleLoginForm = () => {
    setShowLoginForm((prevShowLoginForm) => !prevShowLoginForm);
  };

  return (
    <div className="login-page-container">
      <LogoComponent />

      {showLoginForm ? (
        <LoginForm toggle={toggleLoginForm} setToken={setToken} token={token} />
      ) : (
        <RegisterForm toggle={toggleLoginForm} />
      )}

      <BottomNavigation />
    </div>
  );
};

export default LoginAndRegisterPage;
