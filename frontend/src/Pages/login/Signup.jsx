import React, { useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Redux/auth/action";
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
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.password.trim() !== "" &&
      formData.phone.trim() !== "" &&
      formData.address.trim() !== "" &&
      formData.dateOfBirth &&
      formData.gender.trim() !== ""
    ) {
      if (
        formData.name.trim().length < 4 ||
        formData.password.trim().length < 4
      ) {
        messageApi.error("Name and password must be at least 4 characters");
      } else {
        dispatch(registerUser(formData));
      }
    } else {
      messageApi.error("Please enter all required fields");
    }
  };

  if (auth.data.isAuthenticated) {
    messageApi.success("User registered successfully");
    // Redirect user after successful registration
    // You can use Navigate component from react-router-dom here if needed
    // return <Navigate to="/" />;
  }

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
