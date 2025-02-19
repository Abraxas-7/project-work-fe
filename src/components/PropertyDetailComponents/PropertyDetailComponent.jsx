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

    const [showAllReviews, setShowAllReviews] = useState(false);

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

            const reviewsToShow = showAllReviews ? property.reviews : property.reviews.slice(0, 3);

            return reviewsToShow.map((review) => (
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
            {/* IMMAGINE */}
            <section className="image-section" style={{ height: '100vh' }}>
                <img className="img-fluid w-100 h-100 object-fit-cover" src={property.image} alt={property.title} />
            </section>


            {/* DESCRIZIONE BNB  */}
            <section className="container-fluid py-5">
                <div className="row">

                    <div className="col-md-6">
                        <div className="card p-3">
                            <div className="card bg-danger text-white mb-3">
                                <div className="card-header text-white">
                                    <h5>{property.title}</h5>
                                </div>


                                <div className=" card d-flex justify-content-center col-4 m-2">
                                    <p className="text-center"><strong>Mi piace:</strong> {property.likes}</p>
                                </div>

                                <div className="row">
                                    <div className="col-4">
                                        <div className=" card d-flex justify-content-center align-items-center m-2">
                                            <p className="text-center"><strong>Stanze:</strong> {property.rooms}</p>
                                        </div>
                                    </div>

                                    <div className="col-4">
                                        <div className="card d-flex justify-content-center align-items-center m-2">
                                            <p><strong>Letti:</strong> {property.beds}</p>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className=" card d-flex justify-content-center align-items-center m-2">
                                            <p><strong>Bagni:</strong> {property.bathrooms}</p>
                                        </div>
                                    </div>


                                    <div className="col-4">
                                        <div className="card d-flex justify-content-center align-items-center m-2">
                                            <p><strong>Tipo di immobile:</strong> {property.property_type}</p>
                                        </div>
                                    </div>

                                    <div className="col-4">
                                        <div className="card d-flex justify-content-center align-items-center m-2">
                                            <p><strong>Metri Quadri:</strong> {property.square_meters}</p>
                                        </div>
                                    </div>




                                    <div className="d-flex mb-3 ">
                                        <p><strong>Indirizzo:</strong> {property.adress_road}</p>
                                        <p className="mx-5"><strong>Città:</strong> {property.adress_city}</p>
                                        <p className="mx-5"><strong>Provincia:</strong> {property.adress_hick_town}</p>
                                    </div>

                                    <div className="mb-3">
                                        <p><strong>Email:</strong> {property.contact_email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>


                    {/* CONTACT FORM */}
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <ContactForm />
                            </div>
                        </div>
                    </div>

                </div>
            </section >



            {/* REVIEWS */}
            <section className="container-fluid py-5" >
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <div className="card text-white bg-danger mb-3">
                                    <div className="card-header">
                                        <h5>Le vostre recensioni</h5>
                                    </div>

                                    <div className=" m-3 row">
                                        {renderReviews()}
                                    </div>
                                    <div className="m-auto">
                                        {property?.reviews?.length > 3 && (
                                            <button type="button" className=" d-flex btn btn-light text-dark btn-sm m-3" onClick={() => setShowAllReviews(!showAllReviews)}>
                                                {showAllReviews ? 'Mostra meno recensioni' : 'Mostra tutte le recensioni'}
                                            </button>
                                        )}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <FormReviews properties_id={property.id_properties} reloadReviews={getData} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
