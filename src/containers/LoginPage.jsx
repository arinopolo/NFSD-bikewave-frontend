import LoginForm from "../components/LoginForm";
import LogoComponent from "../components/LogoComponent";
import "../styles/LoginPage.css";

const LoginPage = () => {
  return (
    <div className="login-page-container">
      <LogoComponent />

      <LoginForm />
    </div>
  );
};

export default LoginPage;
