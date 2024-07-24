import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ImageContext from './ImageContext';
import './FeedProfile.css';

const FeedProfile = () => {
  const { images, deleteImage } = useContext(ImageContext);
  const user = useSelector((store) => store.auth.data.user); // Ensure user is correctly accessed from Redux store

  return (
    <main className="main-content">
      <section className="profile-section">
        <div className="feed-sidebar-container">
          <div className="feed-sidebar">
            <Link to="/myntrafeed" className="sidebar-button">Home</Link>
            <Link to="/feedprofile" className="sidebar-button">Profile</Link>
          </div>
        </div>
        <div className="user-content">
          <div className="user-details">
            <div className="user-header">
              
              <div>
                <h2 className="username">{user?.name || "Your Name"}</h2> {/* Display user's name */}
                <p className="post-count">{images.length} <span>posts</span></p>
              </div>
            </div>
            <div className="posts-tab">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b13ff9eb0ce415791d03ea164d01c1c685a66430eaf1f8422200013def8404f2?apiKey=e0ff1949bd6d4c81976d269bea4a004f&&apiKey=e0ff1949bd6d4c81976d269bea4a004f"
                className="posts-icon"
                alt="Posts Icon"
              />
              <span>Posts</span>
            </div>
          </div>
          <div className="gallery-grid">
            {images.map((image, index) => (
              <div className="gallery-item" key={index}>
                <img src={image} className="gallery-image" alt={`Gallery Image ${index + 1}`} />
                <button className="delete-button" onClick={() => deleteImage(index)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default FeedProfile;
