import React, { useEffect, useState } from "react";
import axios from "axios";
import './HomePageStyle.css'
import "bootstrap-icons/font/bootstrap-icons.css";



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
  
  const handleLike = (propertyID) => {
    console.log(propertyID)
    const property = properties.find((p) => p.id_properties === propertyID);

    if (!property) {
      console.error("Proprietà non trovata");
      return;
    }
    const newLikes = property.likes + 1;
    console.log(newLikes)
    setProperties((prevProperties) => 
      prevProperties.map((property) =>
        property.id === propertyID ? { ...property, likes: newLikes } : property
      )
    );


    axios 
      .patch(`http://localhost:3000/api/properties/${propertyID}/likes`,{
        likes: newLikes,
      })
      .then(() => { 
        /* Con questo then andiamo a rifechare tutti i dati dal backend come se lo stessimo facendo per la prima volta, per far si che si addino i like messi in maniera dinamica */
        axios.get(`http://localhost:3000/api/properties`)  
        .then((response) => {
          setProperties(response.data.data)
        })
        .catch((err) => {
          console.log(err)
        })
      })
      .catch((error) => {
        console.log(error)
      })
    }


  if (loading) return(
    <p>Stiamo Caricando i dati</p>
  )

  return (
    <div className="container-fluid">
      <div className="d-flex flex-wrap justify-content-center m-3 gap-3 gy-6">
      {properties.map((property) => (
        <div key={property.id_properties} className="card-css" /*style={{width: '15rem'}}*/>
          <div>
            <img src={property.first_image} className="" />
          </div>
          <div className="description p-3">
            <h5>{property.title}</h5>
            <div className="d-flex justify-content-between">
              <p>{property.host_name}</p>
              <button className="heart-but" onClick={() => handleLike(property.id_properties)}><i class="bi bi-heart-fill"></i>{property.likes}</button>
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
