import { useState } from "react";
import "../styles/LoginForm.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

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
            errors.email = "La dirección del correo es inválida";
          }

          // Validación de la contraseña
          if (!values.password) {
            errors.password = "Por favor introduce tu contraseña";
          }
          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          resetForm();
          console.log("enviadooo");
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
              <Field
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder=""
                autoComplete="off"
              />
              <label htmlFor="password">Contraseña</label>
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
              <ErrorMessage name="password" component="div" className="error" />
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
        <p>¿Aún no tienes cuenta?</p> <a href="">Regístrate</a>
      </div>
    </>
  );
};

export default LoginForm;
