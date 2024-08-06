import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { Slider } from "antd";
import "./singleproduct.css";
import { RiStarSFill } from "react-icons/ri";
import { BiHeart, BiDetail } from "react-icons/bi";
import { HiOutlineShoppingBag } from 'react-icons/hi';

const SingleProduct = () => {
  let { id } = useParams();
  const [proQuantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({
    brand: "Sample Brand",
    title: "Sample Product",
    rating: 4.5,
    count: 123,
    price: 1000,
    off_price: 1200,
    discount: 15,
    stock: 10,
    description: "This is a sample product description.",
    color: "Red",
    size: "M",
    images: [
      "/assets/sample1.jpg",
      "/assets/sample2.jpg",
      "/assets/sample3.jpg"
    ]
  });
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(product.images);

  if (loading) {
    return "Loading...";
  }

  return (
    <div className="singleProComponent">
      <div className="singleProNavigation">
        Home / {product.gender} /{" "}
        <span>
          {product.categories ? product.categories : product.category} /{" "}
          {product.brand}
        </span>
      </div>
      <div className="singlePro">
        <div className="singleProGallery">
          <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
            {image.map((e, i) => (
              <SwiperSlide className="swipeImage" key={i}>
                <img src={e} alt="images" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="singleProDetails">
          <div className="singleProName">
            <h2>{product.brand}</h2>
            <h2>{product.title}</h2>
            <p>
              <span> {product.rating} </span>
              <RiStarSFill className="itemStars" /> | {product.count} Reviews
            </p>
          </div>
          <div className="singleItemDetails">
            <div>
              Rs. {product.price} <s>Rs. {product.off_price}</s>
              <span>({product.discount}% OFF)</span>
            </div>
            <p>Inclusive of all taxes</p>
            <h5 style={{ color: product.stock ? "#14958f" : "red" }}>
              Status : {product.stock ? "InStock" : "Out Of Stock"}
            </h5>
          </div>
          <div className="singleProQuantity">
            <p>Select Quantity : {proQuantity}</p>
            <Slider
              defaultValue={1}
              max={product.stock > 20 ? 20 : product.stock}
              onChange={(e) => setQuantity(e)}
            />
          </div>
          <div className="singleProButtons">
            <button className="addToCart">
              <HiOutlineShoppingBag className="singleProIcons" />
              ADD TO BAG
            </button>
            <button className="addToList">
              <BiHeart className="singleProIcons" />
              WISHLIST
            </button>
          </div>
          <div className="singleProDescription">
            <h3>
              PRODUCT DETAILS <BiDetail />
            </h3>
            <p>{product.description}</p>
            <h4>Color : {product.color}</h4>
            {product.size ? <h4>{product.size}</h4> : null}
          </div>
        </div>
      </div>
      <div className="singleProReviews"></div>
    </div>
  );
};

export default SingleProduct;
