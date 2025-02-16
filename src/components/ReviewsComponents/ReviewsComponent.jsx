

export default function ReviewsComponent({ review }) {

    // Ho estratto i dati della recensione
    const { id_review, review_content, user_name, create_date } = review;

    // Creiamo un oggetto Date dal campo create_date
    const reviewDate = new Date(create_date);

    // Formattiamo la data (giorno, mese, anno)
    const dateString = reviewDate.toLocaleDateString();

    // Utilizziamo toLocaleTimeString per ottenere l'ora e i minuti
    const timeString = reviewDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div key={id_review} className="card col-md-6 mb-4">
            <div className="card-body">
                {/* Nome utente in grassetto */}
                <h5 className="card-title"><strong>Utente:</strong>{user_name}</h5>

                {/* Seconda riga: numero di like, data di creazione e orario */}
                <p className="card-text">
                    <strong>Like:</strong>
                    <span> | </span>
                    <strong>Data di creazione della recensione:</strong> {dateString}
                    <span> | </span>
                    <strong>Ora di creazione: </strong>
                    {timeString}
                </p>

                {/* Contenuto della recensione */}
                <p className="card-text">{review_content}</p>
            </div>
        </div>
    );
}


