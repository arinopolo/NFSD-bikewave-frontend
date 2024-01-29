import { ErrorMessage, Field, Form, Formik } from "formik";
import api from "../api/api";
import "../styles/ListItemForm.css";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const ListItemForm = () => {
  const options = [
    { key: "Select an option", value: "" },
    { key: "City", value: "city" },
    { key: "Mountain", value: "mountain" },
  ];

  const { token } = useContext(AuthContext);
  const handleListitem = async (values) => {
    try {
      console.log(values);
      const listItemData = await api.listItem(values);

      if (listItemData) {
        return <div>añadido con exito</div>;
        console.log(listItemData);
      }
    } catch (error) {
      if (!token) {
        console.log("missing token");
        return;
      }
      console.error(
        "Error en la operación de agregar un producto:",
        error.message
      );
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          brand: "",
          price: 0,
          location: "",
          model: "",
          category: "",
        }}
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
          handleListitem(values);
          resetForm();
        }}
      >
        {() => (
          <Form>
            <div className="form-register">
              <div className=" field-holder-register list-item red">
                <Field type="brand" id="brand" name="brand" placeholder="" />
                <label htmlFor="brand">
                  Marca <span className="required">*</span>
                </label>
                <ErrorMessage name="brand" component="div" className="error" />
              </div>
              <div className="field-holder-register">
                <Field type="number" id="price" name="price" placeholder="" />
                <label htmlFor="price">
                  Precio <span className="required">*</span>
                </label>
                <ErrorMessage name="price" component="div" className="error" />
              </div>
            </div>
            <div className="field-holder-register">
              <Field type="text" id="location" name="location" placeholder="" />
              <label htmlFor="location">
                Localidad <span className="required">*</span>
              </label>
              <ErrorMessage name="location" component="div" className="error" />
            </div>

            <div className="field-holder-register">
              <Field type="text" id="model" name="model" placeholder="" />
              <label htmlFor="model">
                Modelo <span className="required">*</span>
              </label>
              <ErrorMessage name="model" component="div" className="error" />
            </div>

            <div className="field-holder-register">
              <Field as="select" id="category" name="category">
                {options.map((option) => {
                  return (
                    <option key={option.value} value={option.value}>
                      {option.key}
                    </option>
                  );
                })}
              </Field>

              <ErrorMessage name="category" component="div" className="error" />
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
