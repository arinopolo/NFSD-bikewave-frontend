import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/button/Button";
import { ErrorMessage, Field, Form, Formik } from "formik";
import api from "../api/api";
import SuccessMessage from "../components/successMessage/SuccessMessage";
import LogoComponent from "../components/logo/LogoComponent";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  let { singleToken } = useParams();
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePasswordReset = async (values) => {
    try {
      const backendResponse = await api.passwordReset(values, singleToken);

      if (backendResponse.success) {
        setIsSuccess(true);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <>
      <LogoComponent />
      {isSuccess ? (
        <SuccessMessage
          text={"¡Has actualizado tu contraseña!"}
          onClick={() => navigate("/")}
        />
      ) : (
        <div className="flex flex-column gap-2">
          <h2>Escribe tu nueva contraseña</h2>
          <Formik
            initialValues={{ password: "" }}
            validate={(values) => {
              let errors = {};

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
            //enviar el formulario
            onSubmit={(values, { resetForm }) => {
              handlePasswordReset(values);
              resetForm();
            }}
          >
            {() => (
              <Form>
                <div className="field-holder">
                  <Field
                    type="text"
                    id="password"
                    name="password"
                    placeholder=""
                    className="input-login"
                  />
                  <label htmlFor="password" className="label-login">
                    Contraseña
                  </label>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </div>

                {/* Botón de envío */}
                <Button text={" Guardar"} />
              </Form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
};

export default ResetPasswordPage;
