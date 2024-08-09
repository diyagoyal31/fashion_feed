import React from "react";
import "./ProComp.css";
import { RiStarSFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const ProComp = ({ product }) => {
  const {
    images,
    rating,
    count,
    brand,
    title,
    price,
    off_price,
    discount,
    id,
  } = product;

  return (
    <div className="itemBox">
      <Link to={`/product/${id}`}>
        <div className="itemImage">
          <img src={images[0]} alt={title} />
          <p>
            {rating} <RiStarSFill className="itemStars" /> | {count}
          </p>
        </div>
        <div className="itemDetails">
          <h4>{brand}</h4>
          <p>{title}</p>
          <div>
            Rs. {price} <s>Rs. {off_price}</s> <span>({discount}% OFF)</span>
          </div>
        </div>
      </Link>
      <button className="add-to-moodboard">
        🧥 Add to Moodboard
      </button>
    </div>
  );
};

export default ProComp;
