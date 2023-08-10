import React, { useReducer, useState } from "react";
import "./App.css";

const formReducer = (state, event) => {
  if (event.reset) {
    return {
      name: "",
      identificationType: 0,
      identification: "",
      isActive: false,
      countryId: "",
      address: "",
      clientId: "",
      projectId: "",
      roll: "",
    };
  }
  return {
    ...state,
    [event.name]: event.value,
  };
};

function App() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setFormData({
        reset: true,
      });
    }, 3000);
  };
  const handleChange = (event) => {
    const isCheckbox = event.target.type === "checkbox";
    setFormData({
      name: event.target.name,
      value: isCheckbox ? event.target.checked : event.target.value,
    });
  };

  return (
    <div className="wrapper">
      <h1>Crear Sofkiano</h1>
      {submitting && (
        <div>
          You are submitting the following:
          <ul>
            {Object.entries(formData).map(([name, value]) => (
              <li key={name}>
                <strong>{name}</strong>:{value.toString()}
              </li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            <p>Nombre</p>
            <input
              name="name"
              onChange={handleChange}
              value={formData.name || ""}
            />
          </label>
          <label>
            <p>Tipo de identificación</p>
            <select
              name="identificationType"
              onChange={handleChange}
              value={formData.identificationType || ""}
            >
              <option value="">-- Por favor selecciona una opción</option>
              <option value="CC">CC</option>
              <option value="TI">TI</option>
              <option value="PS">PS</option>
            </select>
          </label>
          <label>
            <p>identificación</p>
            <input
              name="identification"
              onChange={handleChange}
              value={formData.identification || ""}
            />
          </label>
          <label>
            <p>Está activo</p>
            <input
              type="checkbox"
              name="isActive"
              onChange={handleChange}
              checked={formData["isActive"] || false}
            />
          </label>
          <label>
            <p>País de residencia</p>
            <select
              name="coubtryId"
              onChange={handleChange}
              value={formData.name || ""}
            >
              <option value="">-- Por favor selecciona una opción</option>
              <option value="f2c2600b-1e5f-4122-b6e2-1dc7a71e4e4f">
                Colombia
              </option>
              <option value="7d377c07-fa1e-4140-a933-0fc3a7d1e1a6">
                Ecuador
              </option>
              <option value="8c5bbf37-89fc-4d9d-a7a4-27a49e4e7140">
                Panama
              </option>
            </select>
          </label>
          <label>
            <p>Dirección de residencia</p>
            <input
              name="address"
              onChange={handleChange}
              value={formData.address || ""}
            />
          </label>
          <label>
            <p>Cliente al cual está vinculado</p>
            <select
              name="clientId"
              onChange={handleChange}
              value={formData.clientId || ""}
            >
              <option value="">-- Por favor selecciona una opción</option>
              <option value="d553cc7b-22f1-4982-a028-d0ffac538fdc">
                compensar
              </option>
              <option value="92f577dd-afee-4abf-a37c-5413e1d49208">sura</option>
              <option value="1ef717b7-eb81-476a-a0a3-300b5f034204">
                sistecredito
              </option>
            </select>
          </label>
          <label>
            <p>Proyecto asignado</p>
            <select
              name="projectId"
              onChange={handleChange}
              value={formData.projectId || ""}
            >
              <option value="">-- Por favor selecciona una opción</option>
              <option value="4f12438a-6aa5-468e-bafd-d389a637c8d2">
                Project Velocity
              </option>
              <option value="6e6fda50-618b-40f1-a33a-bbc49b85bc92">
                Project Nexus
              </option>
              <option value="8d6a96ad-9f0c-4edc-bb9d-19f48a3e2d53">
                Project Fusion
              </option>
            </select>
          </label>
          <label>
            <p>Roll actual</p>
            <input name="roll" onChange={handleChange} />
          </label>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
