import React from "react";
import axios from "axios";
import "./AdvancedSearchStyle.css"
import { useState, useEffect } from "react";
import province from "../../data/province";
import propertyType from "../../data/propertyType";

export default function AdvancedSearchComponent() {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [bedsNum, setBedsNum] = useState('');
    const [bathNum, setBathNum] = useState('');
    const [minmq, setMinmq] = useState('');
    const [maxmq, setMaxmq] = useState('');
    const [houseType, setHouseType] = useState({});
    const [formData, setFormData] = useState({
        adress_hick_town: '',
        property_type: ''
    });

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
                (!bedsNum || item.beds == bedsNum) &&
                (!bathNum || item.bathrooms == bathNum) &&
                (!minmq || item.square_meters >= minmq) &&
                (!maxmq || item.square_meters <= maxmq) &&
                (!formData.adress_hick_town || item.adress_hick_town == formData.adress_hick_town) &&
                (!formData.property_type || item.property_type == formData.property_type)
            );
        });
        setFilteredProperties(filtered);
    }, [inputValue, bedsNum, bathNum, minmq, maxmq, properties, formData.adress_hick_town, formData.property_type]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleCheckboxChange = (event) => {
        setHouseType({
            ...houseType,
            [event.target.value]: event.target.checked,
        });
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const noResults = () => {
        if (filteredProperties.length === 0) {
            return ""
        }
        else { return "d-none" }
    }


    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent form from submitting
    };

    return (
        <>
            <h1>Ricerca avanzata</h1>
            <div id="container">
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label htmlFor="adress_hick_town" className="form-label">
                            Provincia
                        </label>
                        <select
                            className="form-select"
                            style={{
                                maxHeight: "150px",
                                overflowY: "auto",
                            }}
                            id="adress_hick_town"
                            name="adress_hick_town"
                            value={formData.adress_hick_town}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleziona...</option>
                            {province.map((provincia) => (
                                <option key={provincia.code} value={provincia.code}>
                                    {provincia.name} ({provincia.code})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="property_type" className="form-label">
                            Tipo di Proprietà
                        </label>
                        <select
                            className="form-select"
                            style={{
                                maxHeight: "150px",
                                overflowY: "auto",
                            }}
                            id="property_type"
                            name="property_type"
                            value={formData.property_type}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleziona...</option>
                            {propertyType.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>

                    </div>
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
                            min={1}
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
                            min={1}
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
                            min={1}
                        />
                        <input
                            type="number"
                            className="form-control"
                            id="maxmq"
                            value={maxmq}
                            onChange={(e) => setMaxmq(e.target.value)}
                            placeholder="max"
                            min={1}

                        />
                    </div>



                </form >
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
                    <h5 className={noResults()}>Nessuna Proprietà soddisfa i requisiti cercati</h5>
                </section>
            </div>

        </>
    );
}
