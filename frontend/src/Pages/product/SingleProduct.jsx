import React, { useState, useEffect } from "react";
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

// Dummy product data
const allProducts = [
  { 
    id: 1, 
    brand: "Sample Brand", 
    title: "Sample Product", 
    rating: 4.5, 
    count: 123, 
    price: 450, 
    off_price: 1200, 
    discount: 15, 
    stock: 10, 
    description: "This is a sample product description.", 
    color: "Red", 
    size: "M", 
    images: [
      "../../.././assets/products/top1.jpg",
    ]
  },
  // Add more products if needed
];

const SingleProduct = () => {
  const { id } = useParams();
  const [proQuantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a product fetch from dummy data
    const fetchedProduct = allProducts.find(p => p.id === parseInt(id));
    setProduct(fetchedProduct);
    setLoading(false);
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="singleProComponent">
      <div className="singleProNavigation">
        Home / {product.category || 'Products'} /{" "}
        <span>{product.brand}</span>
      </div>
      <div className="singlePro">
        <div className="singleProGallery">
          <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
            {product.images.map((image, index) => (
              <SwiperSlide className="swipeImage" key={index}>
                <img src={image} alt={`Product ${index + 1}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="singleProDetails">
          <div className="singleProName">
            <h2>{product.brand}</h2>
            <h2>{product.title}</h2>
            <p>
              <span>{product.rating}</span>
              <RiStarSFill className="itemStars" />
              <span>({product.count} reviews)</span>
            </p>
            <div>
              Rs. {product.price} <s>Rs. {product.off_price}</s> <span>({product.discount}% OFF)</span>
            </div>
            <p>{product.description}</p>
          </div>
          <div className="singleProActions">
            <button className="add-to-cart">
              <HiOutlineShoppingBag /> Add to Cart
            </button>
            <button className="add-to-wishlist">
              <BiHeart /> Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
