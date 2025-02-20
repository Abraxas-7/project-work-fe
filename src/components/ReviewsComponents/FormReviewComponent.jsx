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
    const [errorMessage, setErrorMessage] = useState();
    const today = new Date();
    const currentDate = today.toLocaleDateString();


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
            setErrorMessage("la data di check-out è obbligatoria.")
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


        axios.post(`${apiUrl}${propertyEndPoint}/${id}/reviews`, formData)
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
                    <div className="alert alert-danger mb-3">
                        {errorMessage}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}>
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
                        <button type="submit" className="btn btn-light text-dark">
                            Invia la tua recensione
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}