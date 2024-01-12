import LogoComponent from "./LogoComponent";
import "../styles/LoginForm.css";

const LoginForm = () => {
  return (
    <>
      <LogoComponent />
      <form action="">
        <label htmlFor="email"></label>
        <input type="text" id="email" placeholder="Email" />
        <label htmlFor="password"></label>
        <input type="password" placeholder="Contraseña" />
      </form>
    </>
  );
};

export default LoginForm;
