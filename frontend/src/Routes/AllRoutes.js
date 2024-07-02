import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../Components/navbar/Navbar";
import Login from "../Pages/login/Login";
import Footer from "../Components/footer/Footer";
import Home from "../Pages/home/Home";
import Admin from "../Pages/admin/Admin";
import Profile from "../Pages/profile/Profile";
import Signup from "../Pages/login/Signup";
import Orders from "../Pages/orders/Orders";
import Product from "../Pages/product/Product";
import SingleProduct from "../Pages/product/SingleProduct";
const AllRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/orders" element={<Orders />}></Route>
        <Route path="/product" element={<Product />}></Route>
        <Route path="/product/:id" element={<SingleProduct />}></Route>
      </Routes>
      <Footer />
    </>
  );
};

export default AllRoutes;
