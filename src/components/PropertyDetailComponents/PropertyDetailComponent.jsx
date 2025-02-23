import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReviewsComponent from "../ReviewsComponents/ReviewsComponent";
import FormReviews from "../ReviewsComponents/FormReviewComponent";
import ContactForm from "./ContactFormComponent";
import ImageListComponent from "../imageListComponents/ImageListComponent";
const apiUrl = "http://localhost:3000/api/";
const PropertyEndPoint = "properties";
console.log(apiUrl);

export default function PropertyDetails() {
    const { id } = useParams();
    const [property, setProperty] = useState({});
    console.log("property", property);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAllReviews, setShowAllReviews] = useState(false);
    const [showAlldescription, setShowAlldescription] = useState(false);

    const handleLike = () => {
        const response = axios.patch(`${apiUrl}${PropertyEndPoint}/${id}/likes`);

        setProperty((prev) => ({
            ...prev,
            likes: prev.likes + 1,
        }));
    };
    useEffect(getData, [id]);
    function getData() {
        setLoading(true);
        axios
            .get(`${apiUrl}${PropertyEndPoint}/${id}`)
            .then((res) => {
                console.log(res.data);
                setProperty(res.data.item);
                setLikes(res.data.item.likes);
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
            const reviewsToShow = showAllReviews
                ? property.reviews
                : property.reviews.slice(0, 2);

            return reviewsToShow.map((review) => (
                <div className="col-12" key={review.id_review}>
                    <div className="review-footer row d-flex">
                        <ReviewsComponent review={review} />
                    </div>
                </div>
            ));
        } else {
            return (
                <div className="col-12">
                    Non ci sono ancora recensioni per questa proprietà: AGGIUNGILA TU!!!
                </div>
            );
        }
    }

    return (
        <>
            {/* TITOLO */}
            <div className="d-flex justify-content-center mt-5">
                <h1><strong>{property.title}</strong></h1>
            </div>

            {/* IMMAGINE */}
            <ImageListComponent images={property?.images || []} />

            {/* DESCRIZIONE BNB LARGE */}
            <section className="container bg-danger text-white p-1 d-none d-md-block ">
                <div className="card p-3 ">
                    <p>{property.property_description}</p>
                </div>
            </section>

            {/* DESCRIZIONE BNB SMALL */}
            <section className="container-fluid d-block d-md-none">
                <div className="p-3 ">
                    <p>
                        {property?.property_description?.length > 0 ? (
                            showAlldescription
                                ? property.property_description
                                : `${property.property_description.substring(0, 200)}...`
                        ) : (
                            "Descrizione non disponibile."
                        )}
                    </p>
                    <div className="d-flex justify-content-center">
                        {property?.property_description?.length > 200 && (
                            <button
                                type="button"
                                className=" btn btn-danger text-white"
                                onClick={() => setShowAlldescription(!showAlldescription)}
                            >
                                {showAlldescription ? "Descrizione - " : "Descrizione + "}
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* DATI BNB LARGE */}
            <section className="container-fluid py-5 d-none d-md-block">
                <div className="row">

                    <div className="col-12 col-md-6">
                        <div className="card p-3">
                            <div className="card bg-danger text-white mb-3">
                                <div className="card m-2" style={{ width: "80px", borderRadius: "15px" }}>
                                    <p className="m-1">
                                        <button
                                            className="heart-but"
                                            onClick={() => handleLike(property.id_properties)}
                                        >
                                            <i className="bi bi-heart-fill"></i>
                                            {property.likes}
                                        </button>
                                    </p>
                                </div>


                                <div className="col-12 col-sm-6 col-md-12 mb-2">
                                    <div className="card m-2">
                                        <p className="m-1">
                                            <strong>Host</strong> {property.host_name}
                                        </p>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12 mb-2">
                                        <div className="card m-2">
                                            <p className="m-1">
                                                <strong>Stanze:</strong> {property.rooms}
                                                <span className="mx-2">|</span>
                                                <strong>Letti:</strong> {property.beds}
                                                <span className="mx-2">|</span>
                                                <strong>Bagni:</strong> {property.bathrooms}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="col-12 mb-2">
                                        <div className="card m-2">
                                            <p className="m-1">
                                                <strong>Tipo di immobile:</strong> {property.property_type}
                                                <span className="mx-2">|</span>
                                                <strong>m²:</strong> {property.square_meters}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="col-12 mb-3">
                                        <div className="card mt-2 mb-4 ms-2 me-2">
                                            <p className="m-1">
                                                <strong>Indirizzo:</strong> {property.adress_road}
                                                <span className="mx-2">|</span>
                                                <strong>Città:</strong> {property.adress_city}
                                                <span className="mx-2">|</span>
                                                <strong>Provincia:</strong> {property.adress_hick_town}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Colonna con form di contatto */}
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* DATI BNB SMALL */}
            <section section className="container-fluid d-block d-md-none" >
                <div className="row">
                    <div className="col-12 col-md-6 col-sm-6">
                        <div className="card p-3">
                            <div className="card bg-danger text-white mb-3">
                                <div className="d-flex justify-content-center align-items-center">
                                    <div className="card  m-2" style={{ width: "80px", borderRadius: "15px" }}>
                                        <p className=" m-1">
                                            <button
                                                className=" heart-but"
                                                onClick={() => handleLike(property.id_properties)}
                                            >
                                                <i className="bi bi-heart-fill"></i>
                                                {property.likes}
                                            </button>
                                        </p>
                                    </div>
                                </div>


                                <div className="col-12 col-sm-6 col-md-12">
                                    <div className="card m-2">
                                        <p className="m-1 text-center">
                                            {property.host_name}
                                        </p>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <div className=" card m-2">
                                            <p className=" m-1 text-center">
                                                <strong>Stanze:</strong> {property.rooms}
                                                <span className="mx-2">|</span>
                                                <strong>Letti:</strong> {property.beds}
                                                <span className="mx-2">|</span>
                                                <strong>Bagni:</strong> {property.bathrooms}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="card m-2">
                                            <p className=" text-center m-1">

                                                {property.property_type}
                                                <span className="mx-2">|</span>
                                                <strong>m²:</strong> {property.square_meters}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="card mt-2 mb-4 ms-2 me-2">
                                            <p className="m-1 text-center">
                                                {property.adress_road}
                                                <span className="mx-2">|</span>
                                                {property.adress_city}
                                                <span className="mx-2">|</span>
                                                {property.adress_hick_town}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CONTACT FORM */}
                    <div className="col-md-6 mt-5 mb-5">
                        <div className="card">
                            <div className="card-body">
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* REVIEWS LARGE*/}
            <section section className="container-fluid d-none d-md-block mb-5" >
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <FormReviews
                                    properties_id={property.id_properties}
                                    reloadReviews={getData}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <div className="card text-white bg-danger mb-3">
                                    <div className="card-header d-flex justify-content-between">
                                        <h5>Cosa dicono i nostri ospiti</h5>
                                        <h5> Recensioni: {property?.reviews?.length}
                                        </h5>
                                    </div>

                                    <div className=" m-3 row">{renderReviews()}</div>
                                    <div className="">
                                        {property?.reviews?.length > 2 && (
                                            <button
                                                type="button"
                                                className=" d-flex btn btn-light text-dark m-3"
                                                onClick={() => setShowAllReviews(!showAllReviews)}
                                            >
                                                {showAllReviews
                                                    ? "Mostra meno recensioni"
                                                    : `Mostra tutte le recensioni (${property.reviews.length})`}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* REVIEWS SMALL*/}
            <section section className="container-fluid d-block d-md-none mb-5 " >
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <FormReviews
                                    properties_id={property.id_properties}
                                    reloadReviews={getData}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 mt-5">
                        <div className="card">
                            <div className="card-body">
                                <div className="card text-white bg-danger mb-3">
                                    <div className="card-header d-flex justify-content-center">
                                        <h5>Cosa dicono i nostri ospiti</h5>
                                        {/* <h5>({property?.reviews?.length})</h5> */}

                                    </div>

                                    <div className=" m-3 row">{renderReviews()}</div>
                                    <div className="m-auto">
                                        {property?.reviews?.length > 2 && (
                                            <button
                                                type="button"
                                                className=" d-flex btn btn-light text-dark m-3"
                                                onClick={() => setShowAllReviews(!showAllReviews)}
                                            >
                                                {showAllReviews
                                                    ? "Mostra meno recensioni"
                                                    : `Mostra tutte le recensioni (${property.reviews.length})`}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    );
}
