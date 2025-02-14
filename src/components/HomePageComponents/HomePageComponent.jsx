import React, { useEffect, useState } from "react";
import axios from "axios";
import './HomePageStyle.css'
function HomePageComponent() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState((true))
  useEffect (() => {
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

  if (loading) return(
    <p>Stiamo Caricando i dati</p>
  )

  return (
    <div className="container-fluid">
      <div className="d-flex flex-wrap justify-content-center gap-4 m-2">
      {properties.map((property) => (
        <div key={property.id} className="card-css" /*style={{width: '15rem'}}*/>
          <div>
            <img src={property.first_image} className="" />
          </div>
          <div className="description p-3">
            <h5>{property.title}</h5>
            <div className="d-flex justify-content-between">
              <p>{property.host_name}</p>
              <p>🤍{property.likes}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p>{property.adress_city}</p>
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
