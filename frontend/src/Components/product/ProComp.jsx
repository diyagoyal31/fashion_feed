import React from "react";
import "./ProComp.css";
import { RiStarSFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToMoodboard } from "../../Redux/auth/action"; // Adjust import path

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
    _id: id,
  } = product;

  const dispatch = useDispatch();

  const handleAddToMoodboard = () => {
    dispatch(addToMoodboard(product));
  };

  return (
    <div className="itemBox">
      <Link to={`/product/${id}`}>
        <div className="itemImage">
          <img src={images.image1} alt="ProductImage" />
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
      <button onClick={handleAddToMoodboard} className="add-to-moodboard">
        🧥 Add to Moodboard
      </button>
    </div>
  );
};

export default ProComp;
