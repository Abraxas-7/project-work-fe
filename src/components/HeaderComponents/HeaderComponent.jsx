import React from "react";
import { NavLink } from "react-router-dom";
function HeaderComponent() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm p-3">
      <div className="container">
        {/* messo navlink come logo del sito  */}
        <NavLink className="navbar-brand text-danger fw-bold" to="/">
          <span className="text-dark">Bool</span>bnb
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link fw-bold" to="/Soggiorni">Soggiorni</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link fw-bold" to="/advancedSearch">Ricerca Avanzata</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-muted" to="/Esperienze">Esperienze</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-muted" to="/Affitta">Affitta con Airbnb</NavLink>
            </li>
          </ul>
        </div>

        <div className="d-flex align-items-center">
          <i className="fas fa-globe me-3 fs-5 text-secondary"></i>
          <button className="btn border rounded-pill d-flex align-items-center">
            <i className="fas fa-bars fs-5 me-2"></i>
            <i className="fas fa-user-circle fs-5"></i>
          </button>
        </div>
      </div>
    </nav>
  );

}



export default HeaderComponent;
