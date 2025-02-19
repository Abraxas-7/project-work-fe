import React from "react";

function FooterComponent() {
  return (
    <>
      <hr />
      <div className="d-flex justify-content-around ">
        <ul className="list-unstyled">
          <span className="fw-bold">Assistenza</span>
          <li>Centro assistenza </li>
          <li>Antidiscriminazione</li>
          <li>Supporto alla disabilità </li>
          <li>opzioni di cancellazione</li>
        </ul>
        <ul className="list-unstyled">
          <span className="fw-bold">Ospitare</span>
          <li>Risorse per gli host</li>
          <li>Forum della community</li>
          <li>Ospitare responsabilmente</li>
        </ul>
        <ul className="list-unstyled">
          <span className="fw-bold">BoolBnB</span>
          <li>Newsroom</li>
          <li>Nuove funzionalità</li>
          <li>Soggiorni con BoolBnb</li>
        </ul>
      </div>
      <hr />
      <div className="d-flex justify-content-between ms-5 me-5 "  >
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
          <li>
            {" "}
            <i className="fa-brands fa-facebook"></i>
          </li>
          <li>
            <i className="fa-brands fa-twitter"></i>
          </li>
          <li>
            <i className="fa-brands fa-instagram"></i>
          </li>
        </ul>
      </div>

    </>
  );
}

export default FooterComponent;
