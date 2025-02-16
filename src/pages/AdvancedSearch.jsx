import React from "react"
import axios from "axios"
import { useState, useEffect } from "react"
export default function AdvancedSearch() {
    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState((true))
    useEffect(() => {
        axios.get('http://localhost:3000/api/properties')
            .then((response) => {
                console.log(response.data)
                setProperties(response.data.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
                return (
                    <div>Errore nel caricare i dati</div>
                )
            })
    }, [])
    const filterProperties = properties.filter(() => {
        if (properties.adress_city) {
            return properties.adress_city === cityName
        }
    })
    return (
        <>
            <section>
                <h1>Ricerca avanzata</h1>
                <div className="mb-3">
                    <label for="formGroupExampleInput" className="form-label">Città</label>
                    <input type="text" className="form-control" id="cityName" placeholder="Inserisci città" />
                </div>
                <div className="mb-3">
                    <label for="formGroupExampleInput2" className="form-label">Num. Letti</label>
                    <input type="number" className="form-control" id="bedsNum" />
                </div>
                <div className="mb-3">
                    <label for="formGroupExampleInput2" className="form-label">Num. Bagni</label>
                    <input type="number" className="form-control" id="bathNum" />
                </div>
                <div className="mb-3">
                    <label for="formGroupExampleInput2" className="form-label">Metri quadri</label>
                    <input type="number" className="form-control" id="minmq" placeholder="min" />
                    <input type="number" className="form-control" id="maxmq" placeholder="max" />
                </div>
                <select className="form-select" aria-label="Default select example">
                    <option selected>Tipo di Alloggio</option>
                    <option value="CasaSingola">Casa Singola</option>
                    <option value="Appartamento">Appartamento</option>
                    <option value="Villa">Villa</option>
                    <option value="Stanza">Stanza</option>
                </select>
                <button>Avvi ricerca</button>
            </section>
            <section>
                {properties.map((property) => (
                    <div key={property.id_properties} className="card-css" /*style={{width: '15rem'}}*/>
                        <div>
                            <img src={property.first_image} className="" />
                        </div>
                        <div className="description p-3">
                            <h5>{property.title}</h5>
                            <div className="d-flex justify-content-between">
                                <p>{property.host_name}</p>
                                <button className="heart-but" onClick={() => handleLike(property.id_properties)}><i className="bi bi-heart-fill"></i>{property.likes}</button>
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
    )
}