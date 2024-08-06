import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { BiSearch, BiUser, BiHeart } from "react-icons/bi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdClose } from "react-icons/md";
import { Dropdown } from "antd";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate authentication state
  const navigate = useNavigate();

  // Simulate authentication check
  useEffect(() => {
    // Replace with actual auth logic
    const checkAuth = async () => {
      // Simulate async call to check authentication
      setIsLoggedIn(await fakeAuthCheck());
    };
    checkAuth();
  }, []);

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
      label: (
        <div>
          <h4>Welcome</h4>
        </div>
      ),
      key: "-1",
    },
    {
      label: (
        <Link to="/login">
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

  // Simulated backend auth check
  const fakeAuthCheck = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate user being logged in
        resolve(true); // Change to false to simulate not logged in
      }, 1000);
    });
  };

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
              {!isLoggedIn ? (
                <p className="mobItem" onClick={handleClick}>
                  <Link to="/login">Login / Signup</Link>
                </p>
              ) : (
                <p className="mobItem" onClick={handleClick}>
                  <Link to="/profile">Profile</Link>
                </p>
              )}
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
