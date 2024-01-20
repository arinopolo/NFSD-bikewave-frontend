import { ErrorMessage, Field, Form, Formik } from "formik";

const ListItemForm = ({ token }) => {
  const listItem = async (values) => {
    console.log(token);
    const addProduct = await fetch("http://localhost:3000/bicycles/add", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      redirect: "follow",
    });
    console.log(addProduct.url);
    console.log(JSON.stringify(values));
    if (!addProduct.ok) {
      throw new Error(`Error: ${addProduct.status} - ${addProduct.statusText}`);
    }
  };

  return (
    <>
      <Formik
        initialValues={{ brand: "", price: 0, location: "" }}
        /*
      validate={(values) => {
        let errors = {};

        // Validación del correo
        if (!values.firstName) {
          errors.firstName = "Por favor introduce tu correo electrónico";
        }

        return errors;
      }} */
        onSubmit={(values, { resetForm }) => {
          listItem(values);
          resetForm();
          console.log("enviadooo");
          //aqui va a ir la conexion con el back haciendo una entrada con token
        }}
      >
        {() => (
          <Form>
            <div className="form-register">
              <div className="field-holder-register">
                <Field type="brand" id="brand" name="brand" placeholder="" />
                <label htmlFor="brand">
                  Marca <span className="required">*</span>
                </label>
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="error"
                />
              </div>
              <div className="field-holder-register">
                <Field type="number" id="price" name="price" placeholder="" />
                <label htmlFor="price">
                  Precio <span className="required">*</span>
                </label>
                <ErrorMessage
                  name="secondName"
                  component="div"
                  className="error"
                />
              </div>
            </div>
            <div className="field-holder-register">
              <Field type="text" id="location" name="location" placeholder="" />
              <label htmlFor="location">
                Localidad <span className="required">*</span>
              </label>
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            {/* Botón de envío */}
            <button type="submit" className="submit">
              Subir mi bicicleta
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ListItemForm;
