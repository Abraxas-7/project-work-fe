import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReviewsComponent from "../ReviewsComponents/ReviewsComponent";
import FormReviews from "../ReviewsComponents/FormReviewComponent";
import ContactForm from "./ContactFormComponent";


const apiUrl = import.meta.env.VITE_API_URL;
const PropertyEndPoint = "properties";
console.log(apiUrl);


export default function PropertyDetails() {
    const { id } = useParams();
    const [property, setProperty] = useState({});
    console.log(property);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(getData, [id]);
    function getData() {
        setLoading(true);
        axios
            .get(`${apiUrl}${PropertyEndPoint}/${id}`)
            .then((res) => {
                console.log(res.data);
                setProperty(res.data.item);
            })
            .catch((error) => {
                console.log(error);
                setError("Si è verificato un errore durante il recupero dei dati.");
            })
            .finally(() => {
                console.log("Finito");
                setLoading(false);
            });

    }


    function renderReviews() {
        if (property?.reviews?.length > 0) {
            return property.reviews.map((review) => (
                <div className="col-12" key={review.id_review}>
                    <div className="review-footer row d-flex">
                        <ReviewsComponent review={review} />
                    </div>
                </div>
            ));
        } else {
            return <div className="col-12">Non ci sono ancora recensioni per questa proprietà: AGGIUNGILA TU!!!</div>;
        }
    }


    return (
        <>
            <section className="d-flex justify-content-center">
                {loading && <p>Loading...</p>} {/* Mostra un messaggio di caricamento */}
                {error && <p>{error}</p>} {/* Mostra il messaggio di errore */}

                {!loading && property && (
                    <div className="card" key={property.id_properties}>
                        <img className="card-img-top" src={property.image} alt={property.title} />
                        <div className="card-body">
                            <h2 className="card-title">{property.title}</h2>
                            <p><strong>Stanze:</strong> {property.rooms}</p>
                            <p><strong>Letti:</strong> {property.beds}</p>
                            <p><strong>Bagni:</strong> {property.bathrooms}</p>
                            <p><strong>Metri Quadri:</strong> {property.square_meters}</p>
                            <p><strong>Email:</strong> {property.contact_email}</p>
                            <p><strong>Tipo di immobile:</strong> {property.property_type}</p>
                            <p><strong>Mi piace:</strong> {property.likes}</p>
                            <p><strong>Città:</strong> {property.adress_city}</p>
                            <p><strong>Indirizzo:</strong> {property.adress_road}</p>
                            <p><strong>Provincia:</strong> {property.adress_hick_town}</p>
                            <button className="btn btn-primary">Contatta</button>
                        </div>
                    </div>
                )}
            </section>

            <section>
                <div className="reviews-section mt-4">
                    <h3>Reviews</h3>
                    <div className="row">
                        {renderReviews()}
                    </div>
                </div>
            </section>

            <section className="container-fluid py-4">
                <FormReviews properties_id={property.id_properties} reloadReviews={getData} />
            </section>

            <section className="container-fluid py-4">

                <ContactForm />

            </section>
        </>
    )
};


