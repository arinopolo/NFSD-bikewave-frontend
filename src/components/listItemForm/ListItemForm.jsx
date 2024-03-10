import { ErrorMessage, Field, Form, Formik } from "formik";
import api from "../../api/api";
import "./ListItemForm.css";
import { useState } from "react";
import PlacesAutocomplete from "../../components/autocompleteInput/AutocompleteInput";
import {
  CityIcon,
  RoadIcon,
  MountainIcon,
  GravelIcon,
  ElectricIcon,
  ProIcon,
} from "../../assets/SVGIcons";

const ListItemForm = ({ setListingTried, setListingSuccess, setLoading }) => {
  const [errorMessage, setErrorMessage] = useState();
  const [step, setStep] = useState(1);
  const [photoFile, setPhotoFile] = useState(null);

  const [coordinates, setCoordinates] = useState({ lat: "", lng: "" });
  
  const [filledFields, setFilledFields] = useState(false);

  const categories = [
    { key: "Categoría", value: "", image: "" },
    { key: "Ciudad", value: "city", image: CityIcon },
    { key: "Carretera", value: "road", image: RoadIcon },
    { key: "Montaña", value: "mountain", image: MountainIcon },
    { key: "Gravel", value: "gravel", image: GravelIcon },
    { key: "Eléctrico", value: "electric", image: ElectricIcon },
    { key: "Competición", value: "pro", image: ProIcon },
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
    setFilledFields(true);
  };

  const staticCenter = {
    lat: 40.4165,
    lng: -3.70256,
    zoom: 13,
  };
  const getRandomOffset = () => {
    return (Math.random() - 0.5) * 0.01;
  };

  const handleListitem = async (values) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("brand", values.brand);
      formData.append("model", values.model);
      formData.append("description", values.description);
      formData.append("location", values.location);
      formData.append("category", values.category);
      formData.append("photo", photoFile);
      formData.append("price", values.price);
      formData.append("deposit", values.deposit);
      formData.append(
        "lat",
        !coordinates.lat
          ? staticCenter.lat + getRandomOffset()
          : coordinates.lat
      );
      formData.append(
        "lng",
        !coordinates.lng
          ? staticCenter.lng + getRandomOffset()
          : coordinates.lng
      );

      const listItemData = await api.listItem(formData);
      setLoading(false);
      if (listItemData && listItemData.success) {
        setListingSuccess(true);
      } else {
        setErrorMessage(listItemData.msg);
        setListingSuccess(false);
      }
    } catch (error) {
      console.error("Error en la operación de agregar un producto:", error);
    }
  };

  const nextStep = () => {
    setStep(step + 1);
    setFilledFields(false);
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
        <div className={step === 4 ? "active" : "not-active"}>
          <span>4</span>
        </div>
        <div className={step === 5 ? "active" : "not-active"}>
          <span>5</span>
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
          address: "",
        }}
        validate={(values) => {
         
          let errors = {};
          if (step === 1) {
            if (!values.brand || !values.model || !values.description) {
              errors.brand = !values.brand ? "Este campo es obligatorio" : "";
              errors.model = !values.model ? "Este campo es obligatorio" : "";
              errors.description = !values.description
                ? "Este campo es obligatorio"
                : "";
            } else {
              setFilledFields(true);
          
            }
          } else if (step === 2) {
            if (!values.category) {
              errors.category = "Este campo es obligatorio";
            } else {
              setFilledFields(true);
            }
          } else if (step === 3) {
            if (!values.location) {
              errors.location = !values.location
                ? "Este campo es obligatorio"
                : "";
              /* errors.address = !values.address
            ? "Este campo es obligatorio"
            : ""; */
            } else {
              setFilledFields(true);
            }
          } else if (step === 4) {
        
            if (photoFile === null) {
              setFilledFields(false);
            } else {
              setFilledFields(true);
            }
          } else if (step === 5) {
            if (!values.price) {
              errors.price = "Este campo es obligatorio";
            } else {
              setFilledFields(true);
            }
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          handleListitem(values);
          resetForm();
          setListingTried(true);
        }}
      >
        {() => (
          <Form encType="multipart/form-data">
            {step === 1 && (
              <div id="firststep">
                <h3>
                  Para empezar, selecciona la marca, el modelo y la categoría de
                  tu bicicleta.
                </h3>

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
                    Modelo <span className="required">*</span>
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
                    Descripción <span className="required">*</span>
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
                <h3>Selecciona la categoría de tu bicicleta</h3>

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
                  <Field
                    name="address"
                    id="address"
                    component={PlacesAutocomplete}
                    onUpdateCoordinates={setCoordinates}
                  />

                  <ErrorMessage
                    name="address"
                    component="div"
                    className="error"
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <div id="thirdstep">
                <h3>Añade un foto de tu bicicleta.</h3>

                <div className="flex flex-column align-center gap-1">
                  <div className="file-container">
                    <Field
                      type="file"
                      id="photo"
                      name="photo"
                      onChange={handlePhotoChange}
                    />

                    <div className="file-selector flex justify-center align-center">
                      <h3>+</h3>
                    </div>

                    <ErrorMessage
                      name="photo"
                      component="div"
                      className="error"
                    />
                  </div>
                  {!photoFile && (
                    <div className="error">Este campo es obligatorio</div>
                  )}
                  {photoFile && (
                    <img
                      className="selected-photo"
                      src={URL.createObjectURL(photoFile)}
                    />
                  )}
                </div>
              </div>
            )}

            {step === 5 && (
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
                    Precio por día <span className="required">*</span>
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

              {step !== 5 && (
                <button
                  type="button"
                  className="step-btn  "
                  onClick={nextStep}
                  disabled={!filledFields}
                >
                  Siguiente
                </button>
              )}
              {step === 5 && (
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
