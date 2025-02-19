import React from "react";
import style from "./FooterComponent.module.css";
import { FaFacebookF, FaXTwitter, FaInstagram } from "react-icons/fa6";
function FooterComponent() {
  return (
    <div className={style.footerContainer}>
      <div className="d-flex flex-column justify-content-center align-items-center p-5">
        <h2 className={style.footerTitle}>BoolBnB</h2>
        <div className={style.footerText}>
          BoolBnB - Il tuo viaggio inizia qui, la tua pagina invece finisce qui
        </div>
        <div className="d-flex ustify-content-center align-items-center gap-3">
          <div className={style.iconList}>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className={style.icon} />
            </a>
          </div>
          <div>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className={style.icon} />
            </a>
          </div>
          <div>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter className={style.icon} />
            </a>
          </div>
        </div>
        <div className="py-3">© 2025 BoolBnB. Tutti i diritti riservati</div>
      </div>
    </div>
  );
}

export default FooterComponent;
