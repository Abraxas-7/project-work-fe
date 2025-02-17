import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const initialData = {

    user_name: "",
    review_content: "",
    start_date: "",
    end_date: "",
};

const apiUrl = import.meta.env.VITE_API_URL;
const propertyEndPoint = "properties";

export default function FormReviews({ reloadReviews }) {
    const { id } = useParams();
    console.log("ID:", id);
    const [formData, setFormData] = useState(initialData);
    const [isFormValid, setFormValid] = useState(true);


    // Funzione di validazione
    function validateForm() {
        if (!formData.user_name) {
            setErrorMessage("Il nome utente è obbligatorio.");
            return false;
        }
        if (!formData.review_content) {
            setErrorMessage("La recensione è obbligatoria.");
            return false;
        }
        if (!formData.start_date || !formData.end_date) {
            setErrorMessage("Le date di inizio e fine sono obbligatorie.");
            return false;
        }
        return true;
    }


    // Funzione di invio del form
    function handleSubmit(e) {
        e.preventDefault();

        if (!validateForm()) {
            setFormValid(false);
            return;
        }

        // Logica per inviare i dati al proprio API
        axios.post(`${apiUrl}${propertyEndPoint}/${id}/reviews`, formData)
            .then((res) => {
                console.log(res);
                setFormValid(true);
                setFormData(initialData); // resetta il form
                reloadReviews(); // ricarica le recensioni
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
        <div className="card">
            <header className="card-header">
                <h5>Aggiungi la tua recensione</h5>
            </header>
            <div className="card-body">
                {!isFormValid && (
                    <div className="alert alert-danger mb-3">
                        Data Form is not valid!
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>User Name</label>
                        <input
                            type="text"
                            name="user_name"
                            className="form-control"
                            value={formData.user_name}
                            onChange={setFieldValue}
                        />

                    </div>
                    <div className="form-group">
                        <label>Review</label>
                        <textarea
                            className="form-control"
                            name="review_content"
                            value={formData.review_content}
                            onChange={setFieldValue}
                        />

                    </div>

                    <div className="form-group">
                        <label>Data Inizio</label>
                        <input
                            type="date"
                            name="start_date"
                            className="form-control"
                            value={formData.start_date}
                            onChange={setFieldValue}
                        />
                    </div>
                    <div className="form-group">
                        <label>Data Fine</label>
                        <input
                            type="date"
                            name="end_date"
                            className="form-control"
                            value={formData.end_date}
                            onChange={setFieldValue}
                        />
                    </div>
                    <div className="d-flex justify-content-end pt-3">
                        <button type="submit" className="btn btn-primary">
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}