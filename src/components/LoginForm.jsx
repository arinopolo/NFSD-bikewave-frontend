import { useState } from "react";
import "../styles/LoginForm.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const LoginForm = ({ toggle, setToken, token }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginTried, setLoginTried] = useState(false);

  const loginHandler = async (values) => {
    try {
      const loginData = await api.login(values.email, values.password);

      setToken(loginData.token);
      navigate("/");
    } catch (error) {
      console.error("Incorrect credentials:", error.message);
      setToken("");
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
          console.log("values", values);
          loginHandler(values);
          resetForm();
          console.log("enviadooo");
          //aqui va a ir la conexion con el back haciendo una entrada con token
        }}
      >
        {() => (
          <Form>
            <div className="field-holder">
              <Field type="text" id="email" name="email" placeholder="" />
              <label htmlFor="email">Email</label>
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
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder=""
                autoComplete="off"
              />
              <label htmlFor="password">Contraseña</label>

              <ErrorMessage name="password" component="div" className="error" />
              {!token && loginTried ? (
                <p className="incorrect-data">Datos incorrectos </p>
              ) : null}
            </div>

            {/* Botón de envío */}
            <button type="submit" className="submit">
              Iniciar sesión
            </button>
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
