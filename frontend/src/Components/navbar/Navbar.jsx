import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { BiSearch, BiUser, BiHeart } from "react-icons/bi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "antd";
import { authLogout } from "../../Redux/auth/action";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const handleClick = (param = "", value = "") => {
    setClick(!click);
    if (param === "" || value === "") {
      setClick(!click);
    } else if (param === "all") {
      return navigate("/product");
    } else {
      return navigate(`/product?${param}=${value}`);
    }
  };

  const handleSearchClick = () => {
    if (keyword.trim()) {
      return navigate(`/product?keyword=${keyword.trim()}`);
    }
  };

  const items = [
    {
      label: auth.data.isAuthenticated ? (
        <div>
          <h4>Welcome, {auth.data.user.name}</h4>
        </div>
      ) : (
        <div>
          <h4>Welcome</h4>
        </div>
      ),
      key: "-1",
    },
    {
      label: auth.data.isAuthenticated ? (
        <p onClick={() => dispatch(authLogout())} p="10px">
          Logout
        </p>
      ) : (
        <Link padding="10px" to="/login">
          Login / Signup
        </Link>
      ),
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: <Link to="/profile">Account</Link>,
      key: "1",
    },
  ];

  const styleA = { left: "-100%" };
  const styleB = { left: "0%" };

  return (
    <div className="container">
      <div className="row v-center">
        <div className="nav-item item-left">
          <div className="logo">
            <Link to="/">
              <img
                src="https://www.freelogovectors.net/wp-content/uploads/2021/02/myntra-logo-freelogovectors.net_.png"
                alt="logo"
              />
            </Link>
          </div>
        </div>
        <div className="nav-item item-center">
          <nav className="menu" style={click ? styleB : styleA}>
            <ul className="menu-main">
              <p className="mobItem">
                <Link>SHOP FOR</Link>
                <MdClose className="cross" onClick={() => handleClick()} />
              </p>
              <li className="menuItem" onClick={() => handleClick("moodboard")}>
                <Link to={`/moodboard`}>Outfit Moodboard</Link>
              </li>
              <li className="menuItem" onClick={() => handleClick("feed")}>
                <Link to={`/myntrafeed`}>Your Myntra Feed</Link>
              </li>
              <li className="menuItem" onClick={() => handleClick("chat")}>
                <Link to={`/chat`}>Chat With Mates</Link>
              </li>
              <p className="mobItem" onClick={handleClick}>
                <Link to="/signup">Login / Signup</Link>
              </p>
              <p className="mobItem" onClick={handleClick}>
                <Link to="/profile">Profile</Link>
              </p>
            </ul>
          </nav>
        </div>
        <div className="nav-item item-right">
          <div
            className="navSearch"
            onKeyUp={({ keyCode }) => {
              if (keyCode === 13) {
                handleSearchClick();
              }
            }}
          >
            <input
              type="text"
              placeholder="Search for products, brands and more"
              onChange={({ target }) => setKeyword(target.value)}
            />
            <BiSearch className="searchIcon" onClick={handleSearchClick} />
          </div>
        
          <div className="navIcons">
            <HiOutlineShoppingBag className="sideIcons" />
            <span>1</span>
            <p className="display">Bag</p>
          </div>
          <div className="navIcons hide">
            <BiSearch className="sideIcons" />
          </div>
          <div className="navIcons display">
            <Dropdown
              menu={{ items, selectable: true, defaultSelectedKeys: ["0"] }}
              placement="bottom"
              trigger={["hover"]}
            >
              <Link onClick={(e) => e.preventDefault()}>
                <BiUser className="sideIcons" />
                <p>Profile</p>
              </Link>
            </Dropdown>
          </div>
          <div className="navIcons hamburger">
            <RxHamburgerMenu className="sideIcons" onClick={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
