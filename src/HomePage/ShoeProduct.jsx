import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

const ShoeProduct = ({
  name,
  imageUrl,
  originalPrice,
  discountPrice,
  description,
}) => {
  return (
    <>
      <div className="card-image position-relative">
        <img
          src={imageUrl}
          alt={name}
          style={{
            width: "100%",
            maxHeight: "186px",
            objectFit: "cover",
          }}
        />
        <span
          className="icon is-small heart-icon"
          style={{ position: "absolute", top: "10px", right: "10px" }}
        >
          <FontAwesomeIcon icon={farHeart} size="lg" />
        </span>
      </div>
      <div className="card-content" style={{ padding: "20px" }}>
        <div
          className="product-price-wrapper"
          style={{ marginBottom: "0.5rem" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
            }}
          >
            <span
              style={{
                textDecoration: "line-through",
                fontSize: "0.75rem",
                marginRight: "0.5rem",
                color: "grey",
                fontWeight: "bold",
              }}
            >
              {originalPrice}€
            </span>
            <span
              style={{
                fontSize: "0.75rem",
                color: "red",
                fontWeight: "bold",
              }}
            >
              -{Math.round((1 - discountPrice / originalPrice) * 100)}%
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              fontSize: "1.40rem",
              fontWeight: "bold",
              color: "black",
            }}
          >
            <span style={{ fontSize: "1rem" }}>€</span>
            {discountPrice.split(".")[0]}
            <sup style={{ fontSize: "1rem", top: "-0.5em" }}>
              {discountPrice.split(".")[1]}
            </sup>
          </div>
        </div>
        <p className="is-size-6">{description}</p>
      </div>
    </>
  );
};

export default ShoeProduct;
