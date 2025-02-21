import React, { useEffect, useState } from "react";
import axios from "axios";
import './HomePageStyle.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import { NavLink } from "react-router-dom";

import JumboTronComponent from "./JumboTronComponent";
import Loader from "../LoaderComponents/Loader";

function HomePageComponent() {
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

  const handleLike = (id) => {
    console.log(id)
    const response = axios.patch(`http://localhost:3000/api/properties/${id}/likes`)
      .then
    setProperties(prev =>
      prev.map(property =>
        property.id_properties === id ? { ...property, likes: property.likes + 1 } : property
      )
    )

  }



  if (loading) return <Loader />;

  return (
    <>
      <JumboTronComponent />
      <div className="container-fluid ">
        <div className="d-flex flex-wrap justify-content-center m-3 gap-4 gy-6">
          {properties.map((property) => (
            <div key={property.id_properties} className="card-css" /*style={{width: '15rem'}}*/>
              <NavLink to={`/properties/${property.id_properties}`}>
                <img src={`http://localhost:3000${property.first_image}`} className="img-fluid" alt={property.title} />
              </NavLink>
              <div className="description">
                <p><strong>{property.title}</strong></p>
                <p>Host:{property.host_name}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p>{property.adress_city}, {property.adress_road} </p>
                  </div>
                  <div>
                    <button className="heart-but" onClick={() => handleLike(property.id_properties)}><i className="bi bi-heart-fill"></i>{property.likes}</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default HomePageComponent;
