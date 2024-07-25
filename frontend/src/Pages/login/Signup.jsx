import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";

const Signup = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Password: "",
    Phone: "",
    Address: "",
    DateOfBirth: "",
    Gender: "",
  });

  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        formData.Name.trim() !== "" &&
        formData.Email.trim() !== "" &&
        formData.Password.trim() !== "" &&
        formData.Phone.trim() !== "" &&
        formData.Address.trim() !== "" &&
        formData.DateOfBirth &&
        formData.Gender.trim() !== ""
      ) {
        if (
          formData.Name.trim().length < 4 ||
          formData.Password.trim().length < 4
        ) {
          messageApi.error("Name and password must be at least 4 characters");
        } else {
          const response = await fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

          const result = await response.json();

          if (response.ok) {
            messageApi.success("User registered successfully.");
            // Redirect user after successful registration
            navigate('/login'); // Navigate to login page or any other page as needed
          } else {
            messageApi.error(result.message || "Registration failed. Please try again.");
          }
        }
      } else {
        messageApi.error("Please enter all required fields");
      }
    } catch (error) {
      messageApi.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="signup">
      <div className="signupContainer">
        <div className="signupImage">
          <img src="./assets/signup.png" alt="signup" />
        </div>
        <div className="signupDetail">
          <div>
            <h3>Signup</h3>
          </div>
          <div>
            <form onSubmit={handleFormSubmit}>
              <input
                name="Name"
                value={formData.Name}
                onChange={handleFormChange}
                type="text"
                placeholder="Full name"
              />
              <input
                name="Email"
                value={formData.Email}
                onChange={handleFormChange}
                type="email"
                placeholder="Enter email"
              />
              <input
                name="Password"
                value={formData.Password}
                onChange={handleFormChange}
                type="password"
                placeholder="Set a password"
              />
              <input
                name="Phone"
                value={formData.Phone}
                onChange={handleFormChange}
                type="text"
                placeholder="Phone"
              />
              <textarea
                name="Address"
                value={formData.Address}
                onChange={handleFormChange}
                placeholder="Address"
              />
              <input
                name="DateOfBirth"
                value={formData.DateOfBirth}
                onChange={handleFormChange}
                type="date"
                max={new Date().toISOString().split("T")[0]} // Sets max date to today
                placeholder="YYYY-MM-DD"
              />
              <select
                name="Gender"
                value={formData.Gender}
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
                {auth.userRegister.loading ? "Loading" : "CONTINUE"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
