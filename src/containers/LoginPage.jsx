import BottomNavigation from "../components/BottomNavigation";
import LoginForm from "../components/LoginForm";
import LogoComponent from "../components/LogoComponent";
import RegisterForm from "../components/RegisterForm";
import "../styles/LoginPage.css";

const LoginPage = () => {
  return (
    <div className="login-page-container">
      <LogoComponent />

    
   <RegisterForm />
      <BottomNavigation />
    </div>
  );
};

export default LoginPage;
