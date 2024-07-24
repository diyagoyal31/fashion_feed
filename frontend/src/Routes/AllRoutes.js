import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../Components/navbar/Navbar";
import Footer from "../Components/footer/Footer";
import Home from "../Pages/home/Home";
import Login from "../Pages/login/Login";
import Signup from "../Pages/login/Signup";
import Moodboard from "../Pages/MoodBoard/MoodboardPage";
import MyntraFeed from "../Pages/Myntrafeed/MyntraFeed";
import FeedProfile from "../Pages/Myntrafeed/FeedProfile";
import { ImageProvider } from "../Pages/Myntrafeed/ImageContext"
import Admin from "../Pages/admin/Admin";
import Profile from "../Pages/profile/Profile";


const AllRoutes = () => {
  return (
    <>
      <Navbar />
      <ImageProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/moodboard" element={<Moodboard />} />
        <Route path="/myntrafeed" element={<MyntraFeed />} />
        <Route path="/feedprofile" element={<FeedProfile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      </ImageProvider>
      <Footer />
    </>
  );
};

export default AllRoutes;
