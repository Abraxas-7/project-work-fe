import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const initialData = {
  user_name: "",
  review_content: "",
  start_date: "",
  end_date: "",
};

const apiUrl = "http://localhost:3000/api/";
const propertyEndPoint = "properties";

export default function FormReviews({ reloadReviews }) {
  const { id } = useParams();
  console.log("ID:", id);
  const [formData, setFormData] = useState(initialData);
  const [isFormValid, setFormValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const today = new Date();
  const currentDate = today.toLocaleDateString();
  const checkInDate = new Date(formData.start_date);
  const checkOutDate = new Date(formData.end_date);

  function validateForm() {
    if (!formData.user_name) {
      setErrorMessage("Il nome utente è obbligatorio.");

      return false;
    }
    if (!formData.review_content) {
      setErrorMessage("La recensione è obbligatoria.");
      return false;
    }
    if (!formData.start_date) {
      setErrorMessage("La data di check-in è obbligatoria.");
      return false;
    }
    if (!formData.end_date) {
      setErrorMessage("la data di check-out è obbligatoria.");
      return false;
    }
    if (checkInDate > today.setHours(0, 0, 0, 0)) {
      setErrorMessage(
        "La data di check-in non può essere superiore alla data odierna."
      );
      return false;
    }
    if (checkOutDate > today.setHours(0, 0, 0, 0)) {
      setErrorMessage(
        "La data di check-out non può essere superiore alla data odierna."
      );
      return false;
    }
    if (checkOutDate <= checkInDate) {
      setErrorMessage(
        "La data di check-out deve essere successiva al check-in."
      );
      return false;
    }

    setErrorMessage();
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      setFormValid(false);
      return;
    }

    axios
      .post(`${apiUrl}${propertyEndPoint}/${id}/reviews`, formData)
      .then((res) => {
        console.log(res);
        setFormValid(true);
        setFormData(initialData);
        reloadReviews();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("finito");
      });
  }

  function setFieldValue(e) {
    console.log(e.target.value, e.target.name);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  return (
    <div className="card text-white bg-danger mb-3">
      <div className="card-header">
        <h5>Come è andato il tuo soggiorno?</h5>
      </div>
      <div className="card-body">
        {!isFormValid && errorMessage && (
          <div
            className="alert alert-warning alert-dismissible fade show mb-3"
            role="alert"
          >
            <i class="bi bi-exclamation-triangle-fill"></i>
            <strong> Oops! </strong> {errorMessage}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              type="text"
              name="user_name"
              className="form-control"
              placeholder="Inserisci il tuo nome utente"
              value={formData.user_name}
              onChange={setFieldValue}
            />
          </div>

          <div className="form-group mb-3">
            <textarea
              className="form-control"
              name="review_content"
              placeholder="Scrivi la tua recensione"
              value={formData.review_content}
              onChange={setFieldValue}
            />
          </div>

          <div className="form-group d-flex gap-1">
            <div className="col-6">
              <label for="start_date">Check-in</label>
              <input
                type="date"
                name="start_date"
                className="form-control"
                placeholder="check-in"
                value={formData.start_date || currentDate}
                onChange={setFieldValue}
              />
            </div>
            <div className="col-6">
              <label for="end_date">Check-out</label>
              <input
                type="date"
                name="end_date"
                className="form-control"
                value={formData.end_date || currentDate}
                onChange={setFieldValue}
              />
            </div>
          </div>
          <div className="d-flex pt-3">
            <button
              type="submit"
              className="btn btn-light text-dark d-none d-md-block"
            >
              Invia la tua recensione
            </button>
          </div>
          <div className="d-flex justify-content-center pt-3 d-block d-md-none ">
            <button type="submit" className="btn btn-light text-dark">
              Invia la tua recensione
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
