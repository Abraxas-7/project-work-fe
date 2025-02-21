import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useSearchParams } from "react-router-dom";
import province from "../../data/province";
import propertyType from "../../data/propertyType";

export default function AdvancedSearchComponent() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    // Stato sincronizzato con i parametri dell'URL
    const [formData, setFormData] = useState({
        adress_hick_town: searchParams.get("adress_hick_town") || "",
        property_type: searchParams.get("property_type") || "",
        city: searchParams.get("city") || "",
        bedsNum: searchParams.get("bedsNum") || "",
        bathNum: searchParams.get("bathNum") || "",
        minmq: searchParams.get("minmq") || "",
        maxmq: searchParams.get("maxmq") || ""
    });

    useEffect(() => {
        axios.get('http://localhost:3000/api/properties')
            .then((response) => {
                setProperties(response.data.data);
                setFilteredProperties(response.data.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    }, []);

    useEffect(() => {
        const filtered = properties.filter((item) => (
            item.adress_city.toLowerCase().includes(formData.city.toLowerCase()) &&
            (!formData.bedsNum || item.beds == formData.bedsNum) &&
            (!formData.bathNum || item.bathrooms == formData.bathNum) &&
            (!formData.minmq || item.square_meters >= formData.minmq) &&
            (!formData.maxmq || item.square_meters <= formData.maxmq) &&
            (!formData.adress_hick_town || item.adress_hick_town == formData.adress_hick_town) &&
            (!formData.property_type || item.property_type == formData.property_type)
        ));
        setFilteredProperties(filtered);
    }, [formData, properties]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);
        setSearchParams(newFormData);
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center text-danger mb-4">Ricerca avanzata</h1>
            <div className="row flex-column flex-lg-row">
                <form className="col-lg-3 mb-4 mb-lg-0">
                    <div className="row g-2">
                        <div className="col-12">
                            <label className="form-label">Provincia</label>
                            <select className="form-select" name="adress_hick_town" value={formData.adress_hick_town} onChange={handleChange}>
                                <option value="">Seleziona...</option>
                                {province.map((provincia) => (
                                    <option key={provincia.code} value={provincia.code}>{provincia.name} ({provincia.code})</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-12">
                            <label className="form-label">Tipo di Proprietà</label>
                            <select className="form-select" name="property_type" value={formData.property_type} onChange={handleChange}>
                                <option value="">Seleziona...</option>
                                {propertyType.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-12">
                            <label className="form-label">Città</label>
                            <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} placeholder="Inserisci città" />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Num. Letti</label>
                            <input type="number" className="form-control" name="bedsNum" value={formData.bedsNum} onChange={handleChange} min={1} />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Num. Bagni</label>
                            <input type="number" className="form-control" name="bathNum" value={formData.bathNum} onChange={handleChange} min={1} />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Metri quadri (min)</label>
                            <input type="number" className="form-control" name="minmq" value={formData.minmq} onChange={handleChange} min={1} />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Metri quadri (max)</label>
                            <input type="number" className="form-control" name="maxmq" value={formData.maxmq} onChange={handleChange} min={1} />
                        </div>
                    </div>
                </form>
                <section className="col-lg-9 d-flex flex-wrap justify-content-evenly">
                    {filteredProperties.map((property) => (
                        <div key={property.id_properties} className="card-css mb-3">
                            <NavLink to={`/properties/${property.id_properties}`}>
                                <img src={`http://localhost:3000${property.first_image}`} className="img-fluid" alt={property.title} />
                            </NavLink>
                            <div className="description p-3">
                                <NavLink style={{ color: "black", textDecoration: "none" }} to={`/properties/${property.id_properties}`}>
                                    <h5>{property.title}</h5>
                                </NavLink>
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
                    {filteredProperties.length === 0 && (
                        <h5 className="text-muted">Nessuna proprietà soddisfa i requisiti cercati</h5>
                    )}
                </section>
            </div>
        </div>
    );
}
