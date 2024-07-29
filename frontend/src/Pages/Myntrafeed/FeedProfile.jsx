import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ImageContext from './ImageContext';
import './FeedProfile.css';

const FeedProfile = () => {
  const { images, deleteImage } = useContext(ImageContext);
  const user = useSelector((store) => store.auth.data.user); // Ensure user is correctly accessed from Redux store
  const [modalImage, setModalImage] = useState(null);
  const [likes, setLikes] = useState({});
  const [isLiked, setIsLiked] = useState({});

  const handleImageClick = (image, index) => {
    setModalImage({
      src: image,
      index: index,
      date: '2024-07-29' // Dummy date; replace with dynamic date if needed
    });
    setLikes((prevLikes) => ({ ...prevLikes, [index]: prevLikes[index] || 0 }));
    setIsLiked((prevIsLiked) => ({ ...prevIsLiked, [index]: prevIsLiked[index] || false }));
  };

  const handleLikeToggle = () => {
    const index = modalImage.index;
    setLikes((prevLikes) => ({
      ...prevLikes,
      [index]: isLiked[index] ? prevLikes[index] - 1 : (prevLikes[index] || 0) + 1
    }));
    setIsLiked((prevIsLiked) => ({ ...prevIsLiked, [index]: !prevIsLiked[index] }));
  };

  const handleDelete = () => {
    if (modalImage && typeof modalImage.index === 'number') {
      deleteImage(modalImage.index);
      closeModal();
    }
  };

  const closeModal = () => {
    setModalImage(null);
  };

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
                <img 
                  src={image} 
                  className="gallery-image" 
                  alt={`Gallery Image ${index + 1}`} 
                  onClick={() => handleImageClick(image, index)} 
                />
                <button className="delete-button" onClick={() => deleteImage(index)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {modalImage && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <span className="uploaded-by">Uploaded by: {user?.name || "Your Name"}</span>
              <span className="close-button" onClick={closeModal}>&times;</span>
            </div>
            <img src={modalImage.src} alt={`Modal Image ${modalImage.index + 1}`} className="modal-image" />
            <div className="modal-footer">
              <button className={`like-button ${isLiked[modalImage.index] ? 'liked' : ''}`} onClick={handleLikeToggle}>
                <img src={isLiked[modalImage.index] ? "/assets/slider/likefilled.png" : "/assets/slider/likenotfilled.png"} alt="Like" className="like-icon" />
              </button>
              <span className="like-count">{likes[modalImage.index] || 0} Likes</span>
              <span className="upload-date">Uploaded on: {modalImage.date}</span>
              <button className="delete-modal-button" onClick={handleDelete}>Delete Post</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default FeedProfile;
