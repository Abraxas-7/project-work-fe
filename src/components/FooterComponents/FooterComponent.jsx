import React from "react";
import style from "./FooterComponent.module.css";
function FooterComponent() {
  return (
    <div className={style.footerContainer}>
      <div className="d-flex justify-content-center align-items-center">
        <p className="text-white fw-bold">
          © 2023 BoolBnB, Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default FooterComponent;
