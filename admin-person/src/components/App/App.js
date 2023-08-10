import React, { useState, useEffect } from "react";
import { Formik, ErrorMessage, Field, Form } from "formik";


const Formulario = () => {
  const [identificationTypes, setIdentificationTypes] = useState([]);
  const [countries, setCountryId] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState("");
  const [projects, setProjects] = useState([]);
  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);


  useEffect(() => {
    // Llamada a la API para obtener las opciones del select
    fetch(
      "http://localhost:8080/api/ms-challenge-person/api/persons/get-identification-type/active?status=d91851c1-9ce9-4e78-8d48-cd55278a12dd",

      {
        method: "GET",
        headers: {
          "Content-Type": "application/json", // Configura el tipo de contenido que estás enviando
          Accept: "application/json", // Configura el tipo de contenido que esperas recibir
        },
      }
    )
      .then((response) => response.json()) // Convierte la respuesta a JSON
      .then((data) => {
        setIdentificationTypes(data);
      })
      .catch((error) => {
        console.error("Error al obtener los tipos de identificación:", error);
      });

    fetch(
      "http://localhost:8080/api/ms-challenge-person/api/persons/get-country/by-status?status=d91851c1-9ce9-4e78-8d48-cd55278a12dd",

      {
        method: "GET",
        headers: {
          "Content-Type": "application/json", // Configura el tipo de contenido que estás enviando
          Accept: "application/json", // Configura el tipo de contenido que esperas recibir
        },
      }
    )
      .then((response) => response.json()) // Convierte la respuesta a JSON
      .then((data) => {
        setCountryId(data);
      })
      .catch((error) => {
        console.error("Error al obtener los países:", error);
      });

    fetch(
      "http://localhost:8080/api/ms-challenge-person/api/persons/get-client/by-status?status=d91851c1-9ce9-4e78-8d48-cd55278a12dd",

      {
        method: "GET",
        headers: {
          "Content-Type": "application/json", // Configura el tipo de contenido que estás enviando
          Accept: "application/json", // Configura el tipo de contenido que esperas recibir
        },
      }
    )
      .then((response) => response.json()) // Convierte la respuesta a JSON
      .then((data) => {
        setClients(data);
      })
      .catch((error) => {
        console.error("Error al obtener los países:", error);
      });
  }, []);

  const handleClientChange = async (event) => {
    const clientId = event.target.value;
    setSelectedClientId(clientId);

    if (clientId) {
      console.log(clientId);
      // Llamada a la API para obtener proyectos basados en el cliente seleccionado
      try {
        const response = await fetch(
          "http://localhost:8080/api/ms-challenge-person/api/persons/get-project/by-clientId?status=d91851c1-9ce9-4e78-8d48-cd55278a12dd&clientId=" +
            clientId,

          {
            method: "GET",
            headers: {
              "Content-Type": "application/json", // Configura el tipo de contenido que estás enviando
              Accept: "application/json", // Configura el tipo de contenido que esperas recibir
            },
          }
        );
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error al obtener proyectos:", error);
      }
    } else {
      setProjects([]);
    }
  };
  const handleSubmit = async (values) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/ms-challenge-person/api/persons/create-persons/save-person",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Configura el tipo de contenido que estás enviando
            Accept: "application/json", // Configura el tipo de contenido que esperas recibir
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        console.log("Datos enviados exitosamente:", values);
		cambiarFormularioEnviado(true)
		setTimeout(()=>cambiarFormularioEnviado(false),2000)
        resetForm()
      } else {
        console.error("Error al enviar los datos:", response.statusText);
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          id: "",
          identificationTypeId: "",
          name: "",
          identification: "",
          address: "",
          isActive: true,
          clientId: "",
          projectId: "",
          roll: "",
          countryId: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className="formulario">
            <h1>Crear Sofkiano</h1>
            <div>
              <label htmlFor="name">Nombre:</label>
              <Field type="text" name="name" />
            </div>
            <div>
              <label htmlFor="identificationTypeId">
                Tipo de Identificación:
              </label>
              <Field as="select" name="identificationTypeId">
                <option value="">Seleccionar</option>
                {identificationTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.abbreviation}
                  </option>
                ))}
              </Field>
            </div>
            <div>
              <label htmlFor="identification">Identificación:</label>
              <Field type="text" name="identification" />
            </div>
            <div>
              <label htmlFor="countryId">País de origen:</label>
              <Field as="select" name="countryId">
                <option value="">Seleccionar</option>
                {countries.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </Field>
            </div>
            <div>
              <label htmlFor="address">Dirección:</label>
              <Field type="text" name="address" />
            </div>
            <div>
              <label htmlFor="clientId">Cliente asignado:</label>
              <Field as="select" name="clientId" onChange={handleClientChange}>
                <option value="">Seleccionar</option>
                {clients.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.clientName}
                  </option>
                ))}
              </Field>
            </div>
            <div>
              <label htmlFor="projectId">Proyecto asignado:</label>
              <Field as="select" name="projectId">
                <option value="">Seleccionar</option>
                {projects.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </Field>
            </div>

            <div>
              <label htmlFor="roll">Rol:</label>
              <Field type="text" name="roll" />
            </div>
            <div >
              <label htmlFor="isActive">Está activo:</label>
              <Field type="checkbox" name="isActive" />
            </div>

            <button type="submit">Enviar</button>
			{formularioEnviado && <p className ="exito">Formulario enviado con exito</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Formulario;
