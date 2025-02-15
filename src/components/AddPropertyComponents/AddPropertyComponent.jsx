import React from "react";
import { useState } from "react";
import axios from "axios";

function AddPropertyComponent() {
  const [formData, setFormData] = useState({
    title: "",
    host_name: "",
    contact_email: "",
    rooms: "",
    bathrooms: "",
    square_meters: "",
    property_type: "",
    adress_road: "",
    adress_city: "",
    adress_hick_town: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
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
        </div>

        <div className="py-3 row d-flex justify-content-center">
          <button type="submit" className="btn btn-primary col-md-8 col-sm-10">
            Aggiungi
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPropertyComponent;
