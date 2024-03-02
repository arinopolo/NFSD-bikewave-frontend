import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const SuccessMessage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-column gap-1">
      <p>Correo Enviado con éxito!</p>
      <Button text={"Continuar"} onClick={handleNavigate} />
    </div>
  );
};

const ForgotPassword = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const handleEmail = async (values) => {
    console.log("lo que envio al back", values.email);
    const email = values.email;
    try {
      const response = await fetch(`${BASE_URL}/users/forgot-password`, {
        method: "PUT",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data) {
        setIsSuccess(true);
        console.log(isSuccess);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <>
      {isSuccess ? (
        <SuccessMessage />
      ) : (
        <div>
          <h2>
            Escribe tu email y te mandamos el link para restablecer tu
            contraseña
          </h2>
          <Formik
            initialValues={{ email: "" }}
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

              return errors;
            }}
            //enviar el formulario
            onSubmit={(values, { resetForm }) => {
              handleEmail(values);
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
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>

                {/* Botón de envío */}
                <Button text={" Enviar email"} />
              </Form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
