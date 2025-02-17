import React, { useState } from 'react';

const ContactForm = ({ property_id, reloadReviews }) => {
    const [email, setEmail] = useState('');
    const [interest, setInterest] = useState('');
    const [message, setMessage] = useState('');
    const [infoRequest, setInfoRequest] = useState('');
    const [showInterestMessage, setShowInterestMessage] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            email,
            interest,
            property_id,
            infoRequest,
        };

        // Simulazione di invio (sostituire con la logica vera di invio)
        console.log('Dati inviati:', formData);


        setMessage('Il modulo è stato inviato con successo!');

        // Se l'utente è interessato all'appartamento, mostra il messaggio specifico
        if (interest === 'interessato') {
            setShowInterestMessage(true);
        }


        if (reloadReviews) {
            reloadReviews();
        }
    };

    return (
        <div className="container mt-5">
            <h2>Modulo di Contatto</h2>
            <p>Sei interessato all'appartamento o hai bisogno di informazioni? Compila il modulo qui sotto.</p>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Indirizzo Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Inserisci la tua email"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="interest" className="form-label">Tipo di richiesta</label>
                    <select
                        className="form-select"
                        id="interest"
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        required
                    >
                        <option value="">Seleziona...</option> {/* Campo vuoto di default */}
                        <option value="interessato">Sono interessato all'appartamento</option>
                        <option value="informazioni">Ho bisogno di informazioni</option>
                    </select>
                </div>


                {interest === 'informazioni' && (
                    <div className="mb-3">
                        <label htmlFor="infoRequest" className="form-label">Dettagli della richiesta</label>
                        <textarea
                            className="form-control"
                            id="infoRequest"
                            rows="4"
                            value={infoRequest}
                            onChange={(e) => setInfoRequest(e.target.value)}
                            placeholder="Descrivi cosa vuoi sapere"
                        />
                    </div>
                )}

                <button type="submit" className="btn btn-primary">Invia</button>
            </form>

            {message && <div className="alert alert-success mt-3">{message}</div>}


            {showInterestMessage && (
                <div className="alert alert-info mt-3">
                    Grazie per il tuo interesse! Verrai contattato dal proprietario tramite l'email che hai fornito.
                </div>
            )}
        </div>
    );
};

export default ContactForm;

