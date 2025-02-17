import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export default function AdvancedSearch() {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [bedsNum, setBedsNum] = useState('');
    const [bathNum, setBathNum] = useState('');
    const [minmq, setMinmq] = useState('');
    const [maxmq, setMaxmq] = useState('');
    const [houseType, setHouseType] = useState({});

    useEffect(() => {
        axios.get('http://localhost:3000/api/properties')
            .then((response) => {
                console.log(response.data);
                setProperties(response.data.data);
                setFilteredProperties(response.data.data); // set initial filtered properties
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
                return <div>Errore nel caricare i dati</div>;
            });
    }, []);

    useEffect(() => {
        // Apply filtering logic whenever the input value or other search parameters change
        const filtered = properties.filter((item) => {
            return (
                item.adress_city.toLowerCase().includes(inputValue.toLowerCase()) &&
                (!bedsNum || item.beds >= bedsNum) &&
                (!bathNum || item.bathrooms >= bathNum) &&
                (!minmq || item.square_meters >= minmq) &&
                (!maxmq || item.square_meters <= maxmq) &&
                (Object.keys(houseType).length === 0 || houseType[item.property_type])
            );
        });
        setFilteredProperties(filtered);
    }, [inputValue, bedsNum, bathNum, minmq, maxmq, houseType, properties]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleCheckboxChange = (event) => {
        setHouseType({
            ...houseType,
            [event.target.value]: event.target.checked,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent form from submitting
    };

    return (
        <>
            <h1>Ricerca avanzata</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">Città</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cityName"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Inserisci città"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Num. Letti</label>
                    <input
                        type="number"
                        className="form-control"
                        id="bedsNum"
                        value={bedsNum}
                        onChange={(e) => setBedsNum(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Num. Bagni</label>
                    <input
                        type="number"
                        className="form-control"
                        id="bathNum"
                        value={bathNum}
                        onChange={(e) => setBathNum(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Metri quadri</label>
                    <input
                        type="number"
                        className="form-control"
                        id="minmq"
                        value={minmq}
                        onChange={(e) => setMinmq(e.target.value)}
                        placeholder="min"
                    />
                    <input
                        type="number"
                        className="form-control"
                        id="maxmq"
                        value={maxmq}
                        onChange={(e) => setMaxmq(e.target.value)}
                        placeholder="max"
                    />
                </div>
                <input
                    type="checkbox"
                    id="CasaSingola"
                    value="CasaSingola"
                    onChange={handleCheckboxChange}
                />
                <label htmlFor="CasaSingola"> Casa Singola</label>
                <input
                    type="checkbox"
                    id="Villa"
                    value="Villa"
                    onChange={handleCheckboxChange}
                />
                <label htmlFor="Villa"> Villa</label>
                <input
                    type="checkbox"
                    id="Appartamento"
                    value="Appartamento"
                    onChange={handleCheckboxChange}
                />
                <label htmlFor="Appartamento"> Appartamento</label>
                <input
                    type="checkbox"
                    id="Stanza"
                    value="Stanza"
                    onChange={handleCheckboxChange}
                />
                <label htmlFor="Stanza"> Stanza</label>
                <button type="submit">Avvia Ricerca</button>
            </form>
            <section>
                {filteredProperties.map((property) => (
                    <div key={property.id_properties} className="card-css">
                        <div>
                            <img src={property.first_image} alt={property.title} />
                        </div>
                        <div className="description p-3">
                            <h5>{property.title}</h5>
                            <div className="d-flex justify-content-between">
                                <p>{property.host_name}</p>
                                <button className="heart-but">
                                    <i className="bi bi-heart-fill"></i>{property.likes}
                                </button>
                            </div>
                            <div className="d-flex gap-2">
                                <p>{property.adress_city},</p>
                                <p>{property.adress_road}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
}
