import React from "react";

function AddPropertyComponent() {
  return (
    <div className="container mt-5">
      <h2>Inserisci un immobile</h2>
      <form>
        <div className="mb-3">
          <label for="title" className="form-label">
            Titolo
          </label>
          <input type="text" className="form-control" id="title" required />
        </div>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label for="rooms" className="form-label">
              Stanze
            </label>
            <input type="number" className="form-control" id="rooms" required />
          </div>
          <div className="col-md-4 mb-3">
            <label for="bathrooms" className="form-label">
              Bagni
            </label>
            <input
              type="number"
              className="form-control"
              id="bathrooms"
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <label for="square_meters" className="form-label">
              Metri Quadrati
            </label>
            <input
              type="number"
              className="form-control"
              id="square_meters"
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label for="contact_email" className="form-label">
            Email Contatto
          </label>
          <input
            type="email"
            className="form-control"
            id="contact_email"
            required
          />
        </div>
        <div className="mb-3">
          <label for="property_type" className="form-label">
            Tipo di Proprietà
          </label>
          <select className="form-select" id="property_type" required>
            <option value="">Seleziona...</option>
            <option value="appartamento">Appartamento</option>
            <option value="villa">Villa</option>
            <option value="monolocale">Monolocale</option>
          </select>
        </div>
        <h4>Indirizzo</h4>
        <div className="mb-3">
          <label for="adress_city" className="form-label">
            Città
          </label>
          <input
            type="text"
            className="form-control"
            id="adress_city"
            required
          />
        </div>
        <div className="mb-3">
          <label for="adress_road" className="form-label">
            Strada
          </label>
          <input
            type="text"
            className="form-control"
            id="adress_road"
            required
          />
        </div>
        <div className="mb-3">
          <label for="adress_hick_town" className="form-label">
            Frazione
          </label>
          <input type="text" className="form-control" id="adress_hick_town" />
        </div>
        <div className="mb-3">
          <label for="host_name" className="form-label">
            Nome Host
          </label>
          <input type="text" className="form-control" id="host_name" required />
        </div>
        <button type="submit" className="btn btn-primary">
          Invia
        </button>
      </form>
    </div>
  );
}

export default AddPropertyComponent;
