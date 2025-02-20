
export default function ReviewsComponent({ review }) {

    const { id_review, review_content, user_name, create_date, start_date, end_date } = review;
    console.log('review', review);
    console.log(start_date, end_date);


    const reviewDate = new Date(create_date);
    const dateString = reviewDate.toLocaleDateString();
    console.log(reviewDate);

    const selectedDate1 = new Date(start_date);
    const startDate = selectedDate1.toLocaleDateString();
    console.log(selectedDate1);

    const selectedDate2 = new Date(end_date);
    const endDate = selectedDate2.toLocaleDateString();
    console.log(selectedDate2);


    const differenceMs = selectedDate2 - selectedDate1;
    const differenceDays = differenceMs / (1000 * 3600 * 24) + 1;
    console.log(`Differenza in giorni: ${differenceDays}`);

    // const timeString = reviewDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // ho tolto l'orario perchè non mi sembrava molto utile. Ma ho lasciato la costante nel caso ci ripensassimo


    return (

        <div key={id_review} className="card col-12 mb-3">
            <div className="card-body d-flex gap-3">
                <div className="col-2">
                    <div className="card-text">
                        <div>{user_name}</div>
                    </div>

                </div>
                <div className="col-10">
                    <div>
                        <small>Data di creazione della recensione: {dateString}</small>
                    </div>
                    <div className="card-text">
                        {/* <small>Ora di creazione: </small> {timeString} */}</div>
                    <div className="card-text"><strong>{review_content}</strong></div>
                    <small>Soggiorno effettuato da {startDate} a {endDate} per {differenceDays} giorno/i </small>
                </div>
            </div>
        </div >
    );
}


