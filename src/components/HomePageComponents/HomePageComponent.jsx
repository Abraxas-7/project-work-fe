import React, { useEffect, useState } from "react";
import axios from "axios";

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
    <>
      {properties.map((property) => (
        <div key={property.id}>
          <div>
            <img src={property.first_image}/>
          </div>
          <h3>{property.title}</h3>
          <p>Host e-mail:{property.contact_email}</p>
          <p>🤍{property.likes}</p>
          <div>
            <p>{property.adress_city}</p>
            <p>{property.adress_road}</p>
          </div>
        </div>
      ))}
    </>
  )
}

export default HomePageComponent;
