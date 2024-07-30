import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footerContainer">
        <div className="footerList">
          <h4>SHOPPING</h4>
          <ul>
            <li>
              <Link to="/">Take me home !</Link>
            </li>
            <li>
              <Link to="/product?gender=men">Men</Link>
            </li>
            <li>
            <Link to="/product?gender=women">Women</Link>
            </li>
            <li>
            <Link to="/product?Kids">Kids</Link>
            </li>
            <li>
            <Link to="/product?footwear">Footwear</Link>
            </li>
            <li>
              <Link to="/product?jewellery">Jewellery</Link>
            </li>
            <li>
            <Link to="/product?makeup">Makeup</Link>
            </li>
          </ul>
        </div>
        <div className="footerList">
          <h4>USEFUL LINKS</h4>
          <ul>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/moodboard">Outfit Moodboard</Link>
            </li>
            <li>
              <Link to="/myntrafeed">Your Myntra Feed</Link>
            </li>
            <li>
              <Link to="/chat">Chat With Mates</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
