import React from "react";

function FooterComponent() {
  return (
    <>
      <div className="container-fluid">
        <hr />
        <div className="row justify-content-center">
          <div className="col-12 col-md-4 text-center mb-3">
            <ul className="list-unstyled">
              <span className="fw-bold">Assistenza</span>
              <li>Centro assistenza</li>
              <li>Antidiscriminazione</li>
              <li>Supporto alla disabilità</li>
              <li>Opzioni di cancellazione</li>
            </ul>
          </div>

          <div className="col-12 col-md-4 text-center mb-3">
            <ul className="list-unstyled">
              <span className="fw-bold">Ospitare</span>
              <li>Risorse per gli host</li>
              <li>Forum della community</li>
              <li>Ospitare responsabilmente</li>
            </ul>
          </div>

          <div className="col-12 col-md-4 text-center mb-3">
            <ul className="list-unstyled">
              <span className="fw-bold">BoolBnB</span>
              <li>Newsroom</li>
              <li>Nuove funzionalità</li>
              <li>Soggiorni con BoolBnb</li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="row justify-content-between align-items-center ms-5 me-5">
          <div className="col-12 col-md-6 text-center text-md-start">
            <ul className="list-unstyled d-flex gap-3 justify-content-center justify-content-md-start mb-0">
              <li>© 2025 Boolbnb, Inc</li>
              <li>Privacy</li>
              <li>Termini</li>
              <li>Mappa del sito</li>
              <li>Dettagli azienda</li>
            </ul>
          </div>

          <div className="col-12 col-md-6 text-center text-md-end">
            <ul className="list-unstyled d-flex gap-3 justify-content-center justify-content-md-end align-items-center mb-0">
              <li>Italiano IT</li>
              <li>€EUR</li>
              <li>
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
        </div>
      </div>
    </>
  );
}

export default FooterComponent;
