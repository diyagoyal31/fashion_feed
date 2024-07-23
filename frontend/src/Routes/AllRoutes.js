import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../Components/navbar/Navbar";
import Footer from "../Components/footer/Footer";
import Home from "../Pages/home/Home";
import Login from "../Pages/login/Login";
import Signup from "../Pages/login/Signup";
import Moodboard from "../Pages/MoodBoard/MoodboardPage";

const AllRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/moodboard" element={<Moodboard />} />
      </Routes>
      <Footer />
    </>
  );
};

export default AllRoutes;
