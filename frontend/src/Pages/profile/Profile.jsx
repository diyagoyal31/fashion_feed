import React, { useState } from "react";
import "./profile.css";
import { Modal } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Profile = () => {
  const [modal2Open, setModal2Open] = useState(false);
  const { user } = useSelector((store) => store.auth.data);
  const [formData, setFormData] = useState({
    name: user.name || "",
    phone: user.phone || "",
    avatar: "",
    gender: "",
    shipping: user.shipping || "",
  });
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    let data = {};
    for (let key in formData) {
      if (formData[key] !== "") {
        data[key] = formData[key];
      }
    }
    console.log(data);
  };

  return (
    <div className="profile">
      <div className="profileCon">
        <div className="profileImage">
          
          <p>{user?.email}</p>
          <button onClick={() => setModal2Open(true)}>EDIT PROFILE</button>
          </div>
        <div className="profileDetails">
          <h3>Profile Details</h3>
          <div>
            <p>Full Name</p>
            <p>{user?.name}</p>
          </div>
          <div>
            <p>Email</p>
            <p>{user?.email}</p>
          </div>
          <div>
            <p>Mobile Number</p>
            <p>{user?.phone ? user.phone : "Not added"}</p>
          </div>
          <div>
            <p>Gender</p>
            <p>{user?.gender ? user.gender : "Not added"}</p>
          </div>
          <div>
            <p>Address</p>
            <p>{user?.address ? user.address : "Not added"}</p>
          </div>
          <div>
            <p>Date of Birth</p>
            <p>{user?.dateOfBirth ? user.dateOfBirth : "Not added"}</p>
          </div>
          <Modal
            title="Edit your personal details"
            open={modal2Open}
            footer={null}
            onCancel={() => setModal2Open(false)}
            style={{ width: "100%" }}
          >
            <form onSubmit={handleFormSubmit}>
              <input
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                type="text"
                placeholder="Full name"
              />
              <br />
              <input
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                type="email"
                placeholder="Email"
              />
              <br />
              <input
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                type="tel"
                placeholder="Enter phone number"
              />
              
              <br />
              <textarea
                name="address"
                value={formData.address}
                onChange={handleFormChange}
                placeholder="Address"
              />
              <br />
              <input
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleFormChange}
                type="date"
                max={new Date().toISOString().split("T")[0]} // Sets max date to today
              />
              <br />
              <select name="gender" value={formData.gender} onChange={handleFormChange}>
                <option value="">Select gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
              <br />
              <button type="button" onClick={() => setModal2Open(false)}>Cancel</button>
              <button type="submit">Save</button>
            </form>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Profile;
