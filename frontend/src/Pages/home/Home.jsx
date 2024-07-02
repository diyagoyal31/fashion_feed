import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Home.css";
import { Link } from "react-router-dom";
import MetaData from "../../Components/MetaData";
import { Carousel } from "react-responsive-carousel";

const Home = () => {
  return (
    <div>
      <MetaData title={"Home Page"} />
      <div className="HomeCarousel">
      <Carousel >
          
            <img src="./assets/slider/ONLY.WEBP" alt="images" />
         
          </Carousel>
      </div>
      <div className="homeNav">
       
      </div>
      <p className="homeHeader">GO SHOPPING</p>
      <div className="homeCategories">
        <div>
        <Link to="/product?gender=men" title="MEN">
          <img src="./assets/navitems/menf.webp" alt="MEN" />
          
        
        <p>MEN</p></Link>
        </div>
        <div>
        <Link to="/product?gender=women" title="WOMEN">
            <img src="./assets/navitems/womenf.webp" alt="" />

          
          <p>WOMEN</p></Link>
        </div>
        <div>
          <Link to="/product?Kids" title="KIDS">
            <img src="./assets/navitems/kidsf.webp" alt="" />
          
          <p>KIDS</p></Link>
        </div>
        <div>
        <Link to="/product?footwear" title="FOOTWEAR">
            <img src="./assets/navitems/foot.webp" alt="" />
          
          <p>FOOTWEAR</p></Link>
        </div>
        <div>
        <Link to="/product?jewellery" title="JEWELLERY">
            <img src="./assets/navitems/jewe.webp" alt="" />
          
          <p>JEWELLERY</p></Link>
        </div>
        <div>
        <Link to="/product?makeup" title="MAKEUP">
            <img src="./assets/navitems/makeup.webp" alt="" />
          
          <p>MAKEUP</p></Link>
        </div>
      </div>
      <p className="homeHeader">SHOP BY CATEGORY</p>
      <div className="homeColors">
      <div><Link to="/product?shirts" title="SHIRTS">
            <img src="./assets/category/Shirts.webp" alt="" /></Link>
        </div>
        <div><Link to="/product?Trousers" title="TROUSERS">
          <img src="./assets/category/Trousers.webp" alt="" /></Link>
        </div>
        <div><Link to="/product?TOPS" title="TOPS">
          <img src="./assets/category/Tops.webp" alt="" /></Link>
        </div>
        <div><Link to="/product?JEANS" title="JEANS">
          <img src="./assets/category/Jeans.webp" alt="" /></Link>
        </div>
        <div><Link to="/product?DRESSES" title="DRESSES">
          <img src="./assets/category/Dresses.webp" alt="" /></Link>
        </div>
        <div><Link to="/product?CS" title="CASUAL-SHOES">
          <img src="./assets/category/Casual-Shoes.webp" alt="" /></Link>
        </div>
        <div><Link to="/product?FLOPS" title="FLIPFLOPS">
          <img src="./assets/category/Flops.webp" alt="" /></Link>
        </div>
        <div><Link to="/product?KURTAS" title="KURTAS">
          <img src="./assets/category/Kurtas.webp" alt="" /></Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
