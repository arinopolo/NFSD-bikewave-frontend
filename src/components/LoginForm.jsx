import { useContext, useState } from "react";
import "../styles/LoginForm.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../contexts/AuthContext";
import Button from "./button/Button";

const LoginForm = ({ toggle }) => {
  const { token, updateToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginTried, setLoginTried] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const loginHandler = async (values) => {
    setErrorMessage("");
    try {
      setErrorMessage("");
      const loginData = await api.login(values.email, values.password);
      if (loginData && loginData.success) {
        updateToken(loginData.token);
        navigate("/");
      } else {
        setErrorMessage(loginData.msg);
      }
    } catch (error) {
      console.error("Login failed. Try again", error);
      setLoginTried(true);
    }
  };

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          let errors = {};

          // Validación del correo
          if (!values.email) {
            errors.email = "Por favor introduce tu correo electrónico";
          } else if (
            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              values.email
            )
          ) {
            errors.email =
              "Por favor, ingrese una dirección de correo electrónico válida.";
          }
          // Validación de la contraseña
          if (!values.password) {
            errors.password = "Por favor introduce tu contraseña";
          }
          return errors;
        }}
        //enviar el formulario
        onSubmit={(values, { resetForm }) => {
          loginHandler(values);
          resetForm();
        }}
      >
        {() => (
          <Form>
            <div className="field-holder">
              <Field
                type="text"
                id="email"
                name="email"
                placeholder=""
                className="input-login"
              />
              <label htmlFor="email" className="label-login">
                Email
              </label>
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="field-holder">
              <span
                className="password-toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FontAwesomeIcon icon={faEyeSlash} size="sm" />
                ) : (
                  <FontAwesomeIcon icon={faEye} size="sm" />
                )}
              </span>
              <Field
                className="input-login"
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder=""
                autoComplete="off"
              />
              <label htmlFor="password" className="label-login">
                Contraseña
              </label>

              <ErrorMessage name="password" component="div" className="error" />

              {!token && loginTried ? (
                <p className="incorrect-data">Login failed. Try again </p>
              ) : null}

              {errorMessage && <p className="incorrect-data">{errorMessage}</p>}
            </div>

            {/* Botón de envío */}
            <Button text={"Iniciar sesión"} />
          </Form>
        )}
      </Formik>

      <a href="" className="link-password-forgoten">
        He olvidado mi contraseña
      </a>

      <div className="container-register-proposal">
        <p>¿Aún no tienes cuenta?</p>{" "}
        <button className="btn-register-login-proposal" onClick={toggle}>
          Regístrate
        </button>
      </div>
    </>
  );
};

export default LoginForm;
