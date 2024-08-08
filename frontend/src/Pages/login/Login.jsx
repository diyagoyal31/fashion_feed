import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    const { email, password } = formData;
  
    if (!email || !password) {
      messageApi.error("Please fill in both fields.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Email: email, Password: password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Store user details in session storage
        sessionStorage.setItem("user", JSON.stringify(data.user));
        
        messageApi.success(data.message);
        navigate("/"); // Redirect to homepage or another page
      } else {
        messageApi.error(data.message);
      }
    } catch (error) {
      messageApi.error("An error occurred. Please try again.");
    }
  };
  
  // Simulated backend request function
  const fakeAuthRequest = (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate success or failure
        const success = email === "test@example.com" && password === "password";
        resolve({ success });
      }, 1000);
    });
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
              <p>
                New User? <Link to="/signup">Signup</Link>
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

export default Login;
