import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const contactData = {
    user_email: "",
    content: "",
};
const apiUrl = import.meta.env.VITE_API_URL;
const contactEndPoint = "properties";
console.log(apiUrl);

export default function ContactForm() {
    const { id } = useParams();
    console.log("ID-Mail:", id);

    const [formData, setFormData] = useState(contactData);
    const [isFormValid, setFormValid] = useState(true);
    const [message, setErrorMessage] = useState('');
    const [showInterestMessage, setShowInterestMessage] = useState(false);

    console.log(formData);

    function validateForm() {
        if (!formData.user_email) {
            setErrorMessage("La mail è obbligatoria.");
            return false;
        }
        if (!formData.content) {
            setErrorMessage("Devi scrivere le informazioni che vuoi richiedere.");
            return false;
        }
        return true;
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!validateForm()) {
            setFormValid(false);
            return;
        }

        console.log('Sto inviando dati a', formData);

        if (formData.content === 'informazioni') {
            formData.content = `Informazioni richieste: ${formData.contentDetails}`;
        }
        else {
            formData.content = `L'utente ${formData.user_email} è interessato all'acquisto dell'appartamento`;
        }

        axios.post(`${apiUrl}${contactEndPoint}/${id}/messages`, formData)
            .then((res) => {
                console.log('Risposta dell API:', res);
                setFormValid(true);
                setFormData(contactData);
                // reloadEmail();
                setErrorMessage("Il tuo messaggio è stato inviato con successo!");
                setShowInterestMessage(true);
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage("Si è verificato un errore durante l'invio del messaggio.");
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
    console.log("Dati da inviare:", formData);

    return (
        <div className="card text-white bg-danger mb-3">
            <div className='card-header'>
                <h5>Modulo di Contatto</h5>
            </div>
            <div className='m-3'>
                <h6>Sei interessato all'appartamento o hai bisogno di informazioni? </h6>
                <h6>Compila il modulo qui sotto.</h6>
            </div>

            <div className='card-body'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        {/* <label htmlFor="email" className="form-label">Indirizzo Email</label> */}
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name='user_email'
                            value={formData.user_email}
                            onChange={setFieldValue}
                            placeholder="Inserisci la tua email"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        {/* <label htmlFor="interest" className="form-label">Tipo di richiesta</label> */}
                        <select
                            className="form-select"
                            id="content"
                            name='content'
                            value={formData.content}
                            onChange={setFieldValue}
                            required
                        >
                            <option value="">Seleziona...</option> {/* Campo vuoto di default */}
                            <option value="interessato">Sono interessato a comprare l'appartamento</option>
                            <option value="informazioni">Avrei bisogno di informazioni...</option>
                        </select>
                    </div>
                    {formData.content === 'informazioni' && (
                        <div className="mb-3">
                            {/* <label htmlFor="infoRequest" className="form-label">Dettagli della richiesta</label> */}
                            <textarea
                                className="form-control"
                                id="contentDetails"
                                name='contentDetails'
                                rows="4"
                                value={formData.contentDetails || ''}
                                onChange={setFieldValue}
                                placeholder="Descrivi cosa vuoi sapere"
                            />
                        </div>
                    )}
                    <button type="submit" className="btn btn-light text-dark">Invia la tua richiesta</button>
                </form>
            </div>

            {message && <div className="alert alert-success m-3">{message}</div>}
            {showInterestMessage && (
                <div className="alert alert-info m-3">
                    Grazie per l'interesse! Verrai contattato dal proprietario tramite l'email che hai fornito.
                </div>
            )}
        </div>
    );
};

