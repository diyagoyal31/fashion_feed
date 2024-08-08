import React, { useState, useEffect } from "react";
import "./profile.css";
import { Modal, Button } from "antd";

const Profile = () => {
  const [modal2Open, setModal2Open] = useState(false);
  const [formData, setFormData] = useState({
    Name: "",
    Phone: "",
    Email: "",
    Address: "",
    DateOfBirth: "",
    Gender: "",
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from session storage
    const userData = sessionStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
      setFormData(JSON.parse(userData)); // Populate form with user data
    }
  }, []);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Simulate form submission
    // Replace with actual update logic if needed
    setUser(formData);
    setModal2Open(false);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        sessionStorage.removeItem("user");
        setUser(null);
        window.location.href = "/login"; // Redirect to login page
      } else {
        console.error("Logout failed.");
      }
    } catch (error) {
      console.error("An error occurred during logout.");
    }
  };

  if (!user) {
    return (
      <div className="profile">
        <div className="profileCon">
          <p>Please login/signup to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile">
      <div className="profileCon">
        <div className="profileImage">
          <p>{user.email}</p>
          <button onClick={() => setModal2Open(true)}>EDIT PROFILE</button>
        </div>
        <div className="profileDetails">
          <h3>Profile Details</h3>
          <div>
            <p>Full Name</p>
            <p>{user.name}</p>
          </div>
          <div>
            <p>Email</p>
            <p>{user.email}</p>
          </div>
          <div>
            <p>Mobile Number</p>
            <p>{user.phone || "Not added"}</p>
          </div>
          <div>
            <p>Gender</p>
            <p>{user.gender || "Not added"}</p>
          </div>
          <div>
            <p>Address</p>
            <p>{user.address || "Not added"}</p>
          </div>
          <div>
            <p>Date of Birth</p>
            <p>{user.dateOfBirth || "Not added"}</p>
          </div>
          <Button onClick={handleLogout}>Logout</Button>
          <Modal
            title="Edit your personal details"
            open={modal2Open}
            footer={null}
            onCancel={() => setModal2Open(false)}
            style={{ width: "100%" }}
          >
            <form onSubmit={handleFormSubmit}>
              <input
                name="Name"
                value={formData.Name}
                onChange={handleFormChange}
                type="text"
                placeholder="Full name"
              />
              <br />
              <input
                name="Email"
                value={formData.Email}
                onChange={handleFormChange}
                type="email"
                placeholder="Email"
              />
              <br />
              <input
                name="Phone"
                value={formData.Phone}
                onChange={handleFormChange}
                type="tel"
                placeholder="Enter phone number"
              />
              <br />
              <textarea
                name="Address"
                value={formData.Address}
                onChange={handleFormChange}
                placeholder="Address"
              />
              <br />
              <input
                name="DateOfBirth"
                value={formData.DateOfBirth}
                onChange={handleFormChange}
                type="date"
                max={new Date().toISOString().split("T")[0]} // Sets max date to today
              />
              <br />
              <select name="Gender" value={formData.Gender} onChange={handleFormChange}>
                <option value="">Select gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
              <br />
              <button type="submit">Save Changes</button>
            </form>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Profile;
