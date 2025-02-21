import React, { useEffect, useState } from "react";
import axios from "axios";
import './HomePageStyle.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import { NavLink } from "react-router-dom";



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
          property.id_properties === id ? {...property, likes: property.likes+1} : property
        )
      )
    
}


  if (loading) return (
    <p>Stiamo Caricando i dati</p>
  )

  return (
    <div className="container-fluid">
      <div className="d-flex flex-wrap justify-content-center m-3 gap-3 gy-6">
        {properties.map((property) => (
          <div key={property.id_properties} className="card-css" /*style={{width: '15rem'}}*/>
            <NavLink to={`/properties/${property.id_properties}`}>
              <img src={property.first_image} className="" />
            </NavLink>
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
      </div>
    </div>
  )
}

export default HomePageComponent;
