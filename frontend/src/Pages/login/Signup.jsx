import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; 
import { message } from "antd";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    gender: "",
  });

  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/signup", formData);

      if (response.status === 201) {
        messageApi.success(response.data.message);
        navigate("/profile"); // Redirect to profile page
      } else {
        messageApi.error(response.data.error || "Registration failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      messageApi.error("Server error during registration");
    }
  };

  return (
    <div className="signup">
      <div className="signupContainer">
        <div className="signupDetail">
          <div>
            <h3>Signup</h3>
          </div>
          <div>
            <form onSubmit={handleFormSubmit}>
              <input
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                type="text"
                placeholder="Full name"
              />
              <input
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                type="email"
                placeholder="Enter email"
              />
              <input
                name="password"
                value={formData.password}
                onChange={handleFormChange}
                type="password"
                placeholder="Set a password"
              />
              <input
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                type="text"
                placeholder="Phone"
              />
              <textarea
                name="address"
                value={formData.address}
                onChange={handleFormChange}
                placeholder="Address"
              />
              <input
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleFormChange}
                type="date"
                max={new Date().toISOString().split("T")[0]} // Sets max date to today
                placeholder="YYYY-MM-DD"
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleFormChange}
              >
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
              <p>
                Already a User? <Link to="/login">Login</Link>.
              </p>
              <button type="submit">
                {contextHolder}
                CONTINUE
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
