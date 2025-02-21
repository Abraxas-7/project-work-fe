import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import province from "../../data/province";
import propertyType from "../../data/propertyType";

export default function AdvancedSearchComponent() {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();

    const [formData, setFormData] = useState({
        adress_hick_town: searchParams.get("adress_hick_town") || '',
        property_type: searchParams.get("property_type") || '',
        city: searchParams.get("city") || '',
        bedsNum: searchParams.get("bedsNum") || '',
        bathNum: searchParams.get("bathNum") || '',
        minmq: searchParams.get("minmq") || '',
        maxmq: searchParams.get("maxmq") || ''
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
                console.error(err);
            });
    }, []);

    useEffect(() => {
        const filtered = properties.filter((item) => {
            return (
                item.adress_city.toLowerCase().includes(formData.city.toLowerCase()) &&
                (!formData.bedsNum || item.beds == formData.bedsNum) &&
                (!formData.bathNum || item.bathrooms == formData.bathNum) &&
                (!formData.minmq || item.square_meters >= formData.minmq) &&
                (!formData.maxmq || item.square_meters <= formData.maxmq) &&
                (!formData.adress_hick_town || item.adress_hick_town == formData.adress_hick_town) &&
                (!formData.property_type || item.property_type == formData.property_type)
            );
        });
        setFilteredProperties(filtered);
        setSearchParams(formData);
    }, [formData, properties]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <h1 className="my-6 mx-auto" style={{ width: "80%", color: "#dc3545" }}>Ricerca avanzata</h1>
            <div id="container" className="d-flex justify-content-evenly my-5 mx-auto" style={{ width: "85%" }}>
                <form style={{ width: "20%", marginLeft: "50px", marginRight: "50px" }}>
                    <div className="mb-2">
                        <label htmlFor="adress_hick_town" className="form-label">Provincia</label>
                        <select className="form-select" id="adress_hick_town" name="adress_hick_town" value={formData.adress_hick_town} onChange={handleChange}>
                            <option value="">Seleziona...</option>
                            {province.map((provincia) => (
                                <option key={provincia.code} value={provincia.code}>{provincia.name} ({provincia.code})</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="property_type" className="form-label">Tipo di Proprietà</label>
                        <select className="form-select" id="property_type" name="property_type" value={formData.property_type} onChange={handleChange}>
                            <option value="">Seleziona...</option>
                            {propertyType.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="city" className="form-label">Città</label>
                        <input type="text" className="form-control" id="city" name="city" value={formData.city} onChange={handleChange} placeholder="Inserisci città" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="bedsNum" className="form-label">Num. Letti</label>
                        <input type="number" className="form-control" id="bedsNum" name="bedsNum" value={formData.bedsNum} onChange={handleChange} min={1} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="bathNum" className="form-label">Num. Bagni</label>
                        <input type="number" className="form-control" id="bathNum" name="bathNum" value={formData.bathNum} onChange={handleChange} min={1} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="minmq" className="form-label">Metri quadri</label>
                        <input type="number" className="form-control" id="minmq" name="minmq" value={formData.minmq} onChange={handleChange} placeholder="min" min={1} />
                        <input type="number" className="form-control" id="maxmq" name="maxmq" value={formData.maxmq} onChange={handleChange} placeholder="max" min={1} />
                    </div>
                </form>
                <section className="d-flex flex-wrap justify-content-evenly" style={{ width: "75%" }}>
                    {filteredProperties.map((property) => (
                        <div key={property.id_properties} className="card-css">
                            <NavLink to={`/properties/${property.id_properties}`}>
                                <img src={`http://localhost:3000${property.first_image}`} alt={property.title} />
                            </NavLink>
                            <div className="description p-3">
                                <NavLink to={`/properties/${property.id_properties}`} style={{ color: "black", textDecoration: "none" }}>
                                    <h5>{property.title}</h5>
                                </NavLink>
                                <div className="d-flex gap-2">
                                    <p>{property.adress_city},</p>
                                    <p>{property.adress_road}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filteredProperties.length === 0 && (
                        <h5 style={{ color: "rgb(129, 129, 129)" }}>Nessuna proprietà soddisfa i requisiti cercati</h5>
                    )}
                </section>

            </div>
        </>
    );
}
