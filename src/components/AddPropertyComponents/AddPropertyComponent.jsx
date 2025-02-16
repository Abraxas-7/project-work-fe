import React, { useState } from "react";
import axios from "axios";
import ImageUpload from "./ImageUploadComponent";

function AddPropertyComponent() {
  const [formData, setFormData] = useState({
    title: "",
    host_name: "",
    contact_email: "",
    rooms: "",
    bathrooms: "",
    beds: "",
    square_meters: "",
    property_type: "",
    adress_road: "",
    adress_city: "",
    adress_hick_town: "",
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    try {
      const response1 = await axios.post(
        "http://localhost:3000/api/properties",
        formData
      );

      console.log("Prima risposta:", response1.data);

      const newPropertyId = response1.data.properties_id;

      const formDataFiles = new FormData();
      formDataFiles.append("id", newPropertyId);

      images.forEach((file) => {
        formDataFiles.append("images", file);
      });

      const response2 = await axios.post(
        `http://localhost:3000/api/images/${newPropertyId}/upload-images`,
        formDataFiles,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Seconda risposta:", response2.data);
    } catch (error) {
      console.error("Errore nella richiesta:", error);
    }
  };

  return (
    <div className="container py-5">
      <form onSubmit={handleSubmit}>
        <h2>Dettagli Proprietà</h2>
        <div className="py-3">
          <div className="py-3">
            <label htmlFor="title" className="form-label">
              Inserisci il nome che vuoi dare al tuo immobile
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="row">
            <div className="col-md-6 py-3">
              <label htmlFor="host_name" className="form-label">
                Inserisci il nome che gli utenti vedranno sulla annuncio
              </label>
              <input
                type="text"
                className="form-control"
                id="host_name"
                value={formData.host_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 py-3">
              <label htmlFor="contact_email" className="form-label">
                Inserisci l'email che gli utenti useranno per contattarti
              </label>
              <input
                type="email"
                className="form-control"
                id="contact_email"
                value={formData.contact_email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-3 col-sm-6 py-3">
              <label htmlFor="rooms" className="form-label">
                Numero di stanze
              </label>
              <input
                type="number"
                className="form-control"
                id="rooms"
                value={formData.rooms}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-3 col-sm-6 py-3">
              <label htmlFor="bathrooms" className="form-label">
                Numero di Bagni
              </label>
              <input
                type="number"
                className="form-control"
                id="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-3 col-sm-6 py-3">
              <label htmlFor="square_meters" className="form-label">
                Metri Quadrati
              </label>
              <input
                type="number"
                className="form-control"
                id="square_meters"
                value={formData.square_meters}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-3 col-sm-6 py-3">
              <label htmlFor="beds" className="form-label">
                Metri Quadrati
              </label>
              <input
                type="number"
                className="form-control"
                id="beds"
                value={formData.beds}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-3 col-sm-6 py-3">
              <label htmlFor="property_type" className="form-label">
                Tipo di Proprietà
              </label>
              <select
                className="form-select"
                id="property_type"
                value={formData.property_type}
                onChange={handleChange}
                required
              >
                <option value="">Seleziona...</option>
                <option value="appartamento">Appartamento</option>
                <option value="villa">Villa</option>
                <option value="monolocale">Monolocale</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row py-3">
          <h4>Indirizzo Proprietà</h4>

          <div className="py-3">
            <label htmlFor="adress_road" className="form-label">
              Via
            </label>
            <input
              type="text"
              className="form-control"
              id="adress_road"
              value={formData.adress_road}
              onChange={handleChange}
              required
            />
          </div>

          <div className="py-3 col-md-10 col-sm-8">
            <label htmlFor="adress_city" className="form-label">
              Città
            </label>
            <input
              type="text"
              className="form-control"
              id="adress_city"
              value={formData.adress_city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-2 col-sm-4 py-3">
            <label htmlFor="adress_hick_town" className="form-label">
              Frazione
            </label>
            <input
              type="text"
              className="form-control"
              id="adress_hick_town"
              value={formData.adress_hick_town}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="py-3">
          <h2>Zona aggiunta immagine</h2>
          <ImageUpload onFilesSelected={setImages} />
        </div>

        <div className="py-3 row d-flex justify-content-center">
          <button type="submit" className="btn btn-primary">
            Aggiungi
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPropertyComponent;
