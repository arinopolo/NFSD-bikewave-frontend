import { ErrorMessage, Field, Formik, Form } from "formik";
import "./RegisterForm.css";
import api from "../../api/api";
import { useState } from "react";
import Button from "../button/Button";
import SuccessMessage from "../successMessage/SuccessMessage";
import { useNavigate } from "react-router-dom";
import FailMessage from "../failMessage/FailMessage";

const RegisterForm = ({ toggle }) => {
  const navigate = useNavigate();
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);
  const [registrationFailed, setRegistrationFailed] = useState(false);
  const [registerTried, setRegisterTried] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleWelcomingEmailSend = async (registerData) => {
    try {
      const backendResponse = await api.sendWelcomingEmail(registerData);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const registerHandler = async (values) => {
    try {
      const registerData = await api.register(values);

      if (registerData.success) {
        setRegistrationSuccessful(true);
        handleWelcomingEmailSend(registerData);
      }
    } catch (error) {
      setRegistrationFailed(true);
      setErrorMessage(error.message);
      console.error(
        "Error en la operación de registrar un usuario:",
        error.message
      );
    }
  };

  return (
    <>
      {registerTried ? (
        registrationSuccessful ? (
          <SuccessMessage
            text={
              "¡Gracias por registrarte! ¡Te hemos enviado un correo de confirmación!"
            }
            onClick={() => navigate("/")}
          />
        ) : (
          <FailMessage
            text={"Hubo un error, vuelve a intentarlo!"}
            onClick={() => navigate("/login")}
          />
        )
      ) : (
        <Formik
          initialValues={{
            firstName: "",
            secondName: "",
            email: "",
            password: "",
          }}
          validate={(values) => {
            let errors = {};

            // Validación del nombre
            if (!values.firstName) {
              errors.firstName = "Por favor introduce tu nombre.";
            } else if (values.firstName.length < 1) {
              errors.firstName =
                "El nombre de usuario debe tener al menos 4 caracteres.";
            } else if (values.firstName.length > 20) {
              errors.firstName =
                "El nombre de usuario no puede tener más de 20 caracteres.";
            } else if (!/^[a-zA-Z]+$/.test(values.firstName)) {
              errors.firstName =
                "El nombre de usuario solo puede contener letras.";
            }

            // Validación del apellido
            if (!values.secondName) {
              errors.secondName = "Por favor introduce tu apellido.";
            } else if (values.secondName.length < 1) {
              errors.secondName =
                "El nombre de usuario debe tener al menos 4 caracteres.";
            } else if (values.secondName.length > 20) {
              errors.secondName =
                "El nombre de usuario no puede tener más de 20 caracteres.";
            } else if (!/^[a-zA-Z]+$/.test(values.secondName)) {
              errors.secondName =
                "El nombre de usuario solo puede contener letras.";
            }

            // Validación del correo
            if (!values.email) {
              errors.email = "Por favor introduce tu correo electrónico";
            } else if (values.email.length < 5 || values.email.length > 30) {
              errors.email =
                "El correo electrónico debe tener entre 5 y 30 caracteres.";
            } else if (
              !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                values.email
              )
            ) {
              errors.email =
                "La dirección de correo electrónico solo puede contener letras, números, @, y . (puntos). Por favor, corrige la dirección ingresada.";
            }
            // Validación de la contraseña
            if (!values.password) {
              errors.password = "Por favor introduce tu contraseña";
            } else if (
              values.password.length < 5 ||
              values.password.length > 20
            ) {
              errors.password =
                "La contraseña debe tener entre 5 y 20 caracteres.";
            } else if (!/(?=.*[A-Z])(?=.*[0-9])/.test(values.password)) {
              errors.password =
                "La contraseña debe contener al menos una letra mayúscula y un número.";
            }
            return errors;
          }}
          onSubmit={(values, { resetForm }) => {
            registerHandler(values);
            resetForm();
            setRegisterTried(true);
            //aqui va a ir la conexion con el back haciendo una entrada con token
          }}
        >
          {() => (
            <Form>
              <div className="form-register">
                <div className="field-holder-register">
                  <Field
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder=""
                    className="input-login"
                  />
                  <label htmlFor="firstName" className="label-login">
                    Nombre <span className="required">*</span>
                  </label>
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="field-holder-register">
                  <Field
                    type="text"
                    id="secondName"
                    name="secondName"
                    placeholder=""
                    className="input-login"
                  />
                  <label htmlFor="secondName" className="label-login">
                    Apellido <span className="required">*</span>
                  </label>
                  <ErrorMessage
                    name="secondName"
                    component="div"
                    className="error"
                  />
                </div>
              </div>
              <div className="field-holder-register">
                <Field
                  type="text"
                  id="email"
                  name="email"
                  placeholder=""
                  className="input-login"
                />
                <label htmlFor="email" className="label-login">
                  Email <span className="required">*</span>
                </label>
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className="field-holder-register">
                <Field
                  className="input-login"
                  type="text"
                  id="password"
                  name="password"
                  placeholder=""
                />
                <label htmlFor="password" className="label-login">
                  Contraseña <span className="required">*</span>
                </label>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>

              <Button text={"Registrarme"} />
            </Form>
          )}
        </Formik>
      )}

      {errorMessage && <p className="incorrect-data">{errorMessage}</p>}
      <div className="container-register-proposal">
        <p>¿Ya tienes cuenta?</p>{" "}
        <button onClick={toggle} className="btn-register-login-proposal">
          Iniciar sessión
        </button>
      </div>
    </>
  );
};

export default RegisterForm;
