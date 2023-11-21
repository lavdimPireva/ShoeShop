import React from "react";

// partners
import postmanKosova from "../img/postmankosova.png";
import beki from "../img/beki.jpg";
import selo from "../img/selo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <div className="columns">
          <div className="column">
            <p className="heading">Të tjera</p>
            <ul
              style={{
                marginRight: "13px",
              }}
            >
              <li
                style={{
                  marginRight: "15px",
                }}
              >
                Imprint
              </li>
              <li>Termet dhe kushtet</li>
              <li>Politikat e privatësisë</li>
            </ul>
          </div>

          <div className="column">
            <p className="heading" style={{ marginLeft: "5px" }}>
              Programi partneritetit
            </p>
            <ul
              style={{
                marginRight: "15px",
              }}
            >
              <li>Bëhu partner</li>
              <li>Kyçu si partner</li>
            </ul>
          </div>
          <div className="column">
            <p className="heading">Rreth nesh</p>
            <ul
              style={{
                marginRight: "13px",
              }}
            >
              <li style={{ marginRight: "15px" }}>Rreth atletja</li>
            </ul>
          </div>
          <div className="column">
            <p
              className="heading"
              style={{
                marginLeft: "25px",
              }}
            >
              Ndihma dhe kontakti
            </p>
            <ul>
              <li>Pytje te shpeshta</li>
              <li>Kontakti</li>
              <li>Blog</li>
            </ul>
          </div>
          {/* ... More columns as per your sections ... */}
        </div>
        <div className="partners">
          <span>Partneret tone jane </span>
          <img src={postmanKosova} alt="postman" className="partner-image" />
          <img src={selo} alt="selo" className="partner-image" />
          <img src={beki} alt="beki" className="partner-image" />

          {/* ... More logos ... */}
        </div>
        <div className="bottom-bar">
          <p>Excellence. Simply Delivered.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
