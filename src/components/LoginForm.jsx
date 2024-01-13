import "../styles/LoginForm.css";

const LoginForm = () => {
  return (
    <>
      <form action="">
        <div className="field-holder">
          <input type="email" id="email" required placeholder="" />
          <label htmlFor="email">Email</label>
        </div>
        <div className="field-holder">
          <input type="password" id="password" required placeholder="" />
          <label htmlFor="password">Contraseña</label>
        </div>
        {/* submit button*/}
        <input type="submit" value="Iniciar sesión" className="submit" />
      </form>
      <a href="" className="link-password-forgoten">He olvidado mi contraseña</a>

      <di className="container-register-proposal">
        <p>¿Aún no tienes cuenta?</p> <a href="">Regístrate</a>
      </di>
    </>
  );
};

export default LoginForm;
