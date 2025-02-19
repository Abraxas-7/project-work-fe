import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function HeaderComponent() {
  useEffect(() => {
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth < 992) {
          navbarToggler.click();
        }
      });
    });
  }, []);

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top"
      style={{
        backgroundColor: "#B7131D",
      }}
    >
      <div className="container-fluid">
        <NavLink
          className="navbar-brand text-white fw-bold ms-3"
          to="/"
          style={{
            fontSize: "2rem",
          }}
        >
          <span className="text-white d-none d-lg-inline">BoolBnB</span>
          <span className="text-white d-lg-none">BBB</span>
        </NavLink>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FaBars style={{ color: "white", fontSize: "2rem" }} />
        </button>
        <div
          className="collapse navbar-collapse justify-content-end me-3"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className="nav-link text-white fw-bold"
                to="/advancedSearch"
                style={{ fontSize: "1.1rem" }}
              >
                Ricerca Avanzata
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link text-white fw-bold"
                to="/Affitta"
                style={{ fontSize: "1.1rem" }}
              >
                Affitta con Boolbnb
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default HeaderComponent;
