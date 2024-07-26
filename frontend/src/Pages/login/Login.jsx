import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const auth = useSelector((store) => store.auth);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending form data:", formData); // Log the form data being sent

      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Server response:", result); // Log the server response

      if (response.ok) {
        messageApi.success("Login successful!");
        navigate("/profile"); // Redirect to profile page
      } else {
        messageApi.error(result.error || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error); // Log any errors during the fetch request
      messageApi.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login">
      <div className="loginContainer">
        <div className="loginImage">
          <img src="./assets/signup.jpg" alt="" />
        </div>
        <div className="loginDetail">
          <div>
            <h3>Login</h3>
          </div>
          <div>
            <form onSubmit={handleFormSubmit}>
              <input
                name="Email"
                value={formData.Email}
                onChange={handleFormChange}
                type="Email"
                placeholder="Enter email"
              />
              <input
                name="Password"
                value={formData.Password}
                onChange={handleFormChange}
                type="Password"
                placeholder="Set a password"
              />
              <p>
                New User? <Link to="/signup">Signup</Link>
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

export default Login;
