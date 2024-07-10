import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../Components/navbar/Navbar";
import Login from "../Pages/login/Login";
import Footer from "../Components/footer/Footer";
import Home from "../Pages/home/Home";


import Signup from "../Pages/login/Signup";


const AllRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/" element={<Home />}></Route>
        
       
       
      </Routes>
      <Footer />
    </>
  );
};

export default AllRoutes;
