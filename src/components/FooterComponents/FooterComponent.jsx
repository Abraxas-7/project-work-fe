import React from "react";

function FooterComponent() {
  return (
    <>
      <hr />
      <div className="d-flex justify-content-around">
        <ul className="list-unstyled">
          <span className="fw-bold">Assistenza</span>
          <li>Centro assistenza </li>
          <li>AirCover</li>
          <li>Antidiscriminazione</li>
          <li>Supporto alla disabilità </li>
          <li>opzioni di cancellazione</li>
          <li>segnala problema nel quartiere</li>
        </ul>
        <ul className="list-unstyled">
          <span className="fw-bold">Ospitare</span>
          <li>apri un bnb</li>
          <li>AirCover per gli host</li>
          <li>Risorse per gli host</li>
          <li>Forum della community</li>
          <li>Ospitare responsabilmente</li>
          <li>Partecipa a una lezione gratuita sull'ospitalità</li>
          <li>Trova un co‑host</li>
        </ul>
        <ul className="list-unstyled">
          <span className="fw-bold">AirBnB</span>
          <li>Newsroom</li>
          <li>Nuove funzionalità</li>
          <li>Opportunità di lavoro</li>
          <li>Investitori</li>
          <li>Gift card</li>
          <li>Soggiorni con Airbnb.org</li>
        </ul>

      </div>
      <hr />
      <div className="d-flex justify-content-between">
        <ul className="list-unstyled d-flex gap-3">
          <li>© 2025 Boolbnb, Inc</li>
          <li>privacy</li>
          <li>termini</li>
          <li>mappa del sito</li>
          <li>dettagli azienda</li>
        </ul>
        <ul className="list-unstyled d-flex gap-3 align-items-center">
          <li>italiano IT </li>
          <li>€EUR</li>
          <li> <i className="fa-brands fa-facebook"></i></li>
          <li><i className="fa-brands fa-twitter"></i></li>
          <li><i className="fa-brands fa-instagram"></i>
          </li>
        </ul>
      </div>
    </>
  )
}

export default FooterComponent;
