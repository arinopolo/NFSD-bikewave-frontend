import { ErrorMessage, Field, Formik, Form } from "formik";
import "../styles/RegisterForm.css";

const RegisterForm = () => {
  return (
    <>
      <Formik
        initialValues={{ firstName: "" }}
        validate={(values) => {
          let errors = {};

          // Validación del correo
          if (!values.firstName) {
            errors.firstName = "Por favor introduce tu correo electrónico";
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          resetForm();
          console.log("enviadooo");
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
                />
                <label htmlFor="firstName">
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
                />
                <label htmlFor="secondName">
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
              <Field type="text" id="email" name="email" placeholder="" />
              <label htmlFor="email">
                Email <span className="required">*</span>
              </label>
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className="field-holder-register">
              <Field type="text" id="password" name="password" placeholder="" />
              <label htmlFor="password">
                Contraseña <span className="required">*</span>
              </label>
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            {/* Botón de envío */}
            <button type="submit" className="submit">
              Registrarme
            </button>
          </Form>
        )}
      </Formik>
      <div className="container-register-proposal">
        <p>¿Ya tienes cuenta?</p> <a href="">Iniciar sessión</a>
      </div>
    </>
  );
};

export default RegisterForm;
