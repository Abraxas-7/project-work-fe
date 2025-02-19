import React from "react";
import style from "./FooterComponent.module.css";
function FooterComponent() {
  return (
    <div className={style.footerContainer}>
      <div className="d-flex flex-column justify-content-center align-items-center p-5">
        <h3>BoolBnB</h3>
        <p></p>
        <ul>
          <li>
            <a href="#"></a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default FooterComponent;
