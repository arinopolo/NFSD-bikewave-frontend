import { ErrorMessage, Field, Form, Formik } from "formik";
import api from "../api/api";
import "../styles/ListItemForm.css";
import { useState } from "react";

const ListItemForm = () => {
  const [errorMessage, setErrorMessage] = useState();
  const [step, setStep] = useState(1);
  const [photoFile, setPhotoFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const categories = [
    { key: "Categoría", value: "" },
    { key: "Ciudad", value: "city" },
    { key: "Carretera", value: "road" },
    { key: "Montaña", value: "mountain" },
    { key: "Gravel", value: "gravel" },
    { key: "Eléctrico", value: "electric" },
    { key: "Competición", value: "pro" },
  ];

  const cities = [
    { key: "Ubicación", value: "" },
    { key: "Madrid", value: "madrid" },
    { key: "Barcelona", value: "barcelona" },
    { key: "Valencia", value: "valencia" },
  ];

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setPhotoFile(file);
    setFileName(file.name);
  };
  const handleListitem = async (values) => {
    try {
      console.log(values.photo);
      const formData = new FormData();
      formData.append("brand", values.brand);
      formData.append("model", values.model);
      formData.append("description", values.description);
      formData.append("location", values.location);
      formData.append("category", values.category);
      formData.append("photo", photoFile); // Asegúrate de enviar el archivo de imagen aquí
      formData.append("price", values.price);
      formData.append("deposit", values.deposit);

      const listItemData = await api.listItem(formData);

      if (listItemData && listItemData.success) {
      } else {
        setErrorMessage(listItemData.msg);
      }
    } catch (error) {
      console.error("Error en la operación de agregar un producto:", error);
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const previousStep = () => {
    setStep(step - 1);
  };
  return (
    <>
      <div className="steps">
        <div className={step === 1 ? "active" : "not-active"}>
          <span>1</span>
        </div>
        <div className={step === 2 ? "active" : "not-active"}>
          <span>2</span>
        </div>
        <div className={step === 3 ? "active" : "not-active"}>
          <span>3</span>
        </div>
      </div>
      <Formik
        initialValues={{
          brand: "",
          model: "",
          description: "",
          location: "",
          category: "",
          photo: "",
          price: 0,
          deposit: 0,
        }}
        validate={(values) => {
          let errors = {};

          // Validación del correo
          if (!values.brand) {
            errors.brand = "Este campo es obligatorio";
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          handleListitem(values);
          resetForm();
        }}
      >
        {() => (
          <Form encType="multipart/form-data">
            {step === 1 && (
              <div id="firststep">
                <h3>¿Cuál es la marca, modelo y tamaño de tu bicicleta?</h3>
                <div className="field-holder">
                  <Field
                    type="text"
                    id="brand"
                    name="brand"
                    placeholder=""
                    className="input-listitem"
                  />
                  <label htmlFor="brand" className="label-listitem ">
                    Marca <span className="required">*</span>
                  </label>
                  <ErrorMessage
                    name="brand"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="field-holder">
                  <Field
                    type="text"
                    id="model"
                    name="model"
                    placeholder=""
                    className="input-listitem"
                  />
                  <label htmlFor="model" className="label-listitem ">
                    Modelo
                  </label>
                  <ErrorMessage
                    name="model"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="field-holder">
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    placeholder=""
                    className="input-listitem"
                  />
                  <label htmlFor="description" className="label-listitem ">
                    Descripción
                  </label>
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="error"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div id="secondstep">
                <h3>
                  Selecciona la ciudad donde te encuentras y la categoría de tu
                  bicicleta
                </h3>
                <div className="field-holder">
                  <Field as="select" id="location" name="location">
                    {cities.map((city) => {
                      return (
                        <option key={city.value} value={city.value}>
                          {city.key}
                        </option>
                      );
                    })}
                  </Field>

                  <ErrorMessage
                    name="location"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="field-holder">
                  <Field as="select" id="category" name="category">
                    {categories.map((category) => {
                      return (
                        <option key={category.value} value={category.value}>
                          {category.key}
                        </option>
                      );
                    })}
                  </Field>

                  <ErrorMessage
                    name="category"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="field-holder">
                  <Field
                    type="file"
                    id="photo"
                    name="photo"
                    onChange={handlePhotoChange}
                  />

                  <ErrorMessage
                    name="photo"
                    component="div"
                    className="error"
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div id="thirdstep">
                <h3>
                  Indica el precio diario por el cual deseas alquilar tu
                  bicicleta y, si lo prefieres, especifica el depósito de
                  garantía.
                </h3>
                <div className="field-holder">
                  <Field
                    type="number"
                    id="price"
                    name="price"
                    placeholder=""
                    className="input-listitem"
                  />
                  <label htmlFor="price" className="label-listitem ">
                    Precio <span className="required">*</span>
                  </label>
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="field-holder">
                  <Field
                    type="number"
                    id="deposit"
                    name="deposit"
                    placeholder=""
                    className="input-listitem"
                  />
                  <label htmlFor="deposit" className="label-listitem ">
                    Fianza
                  </label>
                  <ErrorMessage
                    name="deposit"
                    component="div"
                    className="error"
                  />
                </div>
              </div>
            )}
            {errorMessage && <p className="incorrect-data">{errorMessage}</p>}

            <div className="btn-container flex-row-space-between">
              <button
                type="button"
                className="step-btn back"
                onClick={previousStep}
                disabled={step === 1}
              >
                Volver
              </button>

              {step !== 3 && (
                <button type="button" className="step-btn  " onClick={nextStep}>
                  Siguiente
                </button>
              )}
              {step === 3 && (
                <button type="submit" className="step-btn">
                  Subir
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ListItemForm;
