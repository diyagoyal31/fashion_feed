import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ImageContext from './ImageContext';
import './MyntraFeed.css';

const MyntraFeed = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [modalImage, setModalImage] = useState(null);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userName, setUserName] = useState('');
  const { addImages } = useContext(ImageContext);
  const navigate = useNavigate();

  const fetchUserNameById = async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}`); // Adjust the endpoint as needed
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.name || ''; // Return an empty string if the name is not found
    } catch (error) {
      console.error('Failed to fetch user name:', error);
      return ''; // Return an empty string in case of error
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
    setErrorMessage(''); // Clear any previous error messages
  };

  const handleUpload = () => {
    if (selectedFiles.length === 0) {
      setErrorMessage('Please select a file to upload.');
      return;
    }
    const imageUrls = selectedFiles.map(file => URL.createObjectURL(file));
    addImages(imageUrls);
    navigate('/feedprofile');
  };

  const handleImageClick = async () => {
    const name = await fetchUserNameById(1); // Assuming userId 1 for the first image
    setUserName(name);
    setModalImage({
      src: '/assets/slider/feed1.webp',
      alt: 'Feed Image 1',
      date: '2024-07-29', // Dummy date; replace with dynamic date if needed
      userId: 1 // Assuming userId 1 for the first image
    });
  };

  const handleLikeToggle = () => {
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  const closeModal = () => {
    setModalImage(null);
    setUserName('');
  };

  useEffect(() => {
    if (modalImage && modalImage.userId) {
      fetchUserNameById(modalImage.userId).then(name => setUserName(name));
    }
  }, [modalImage]);

  return (
    <main className="myntra-main-content">
      <div className="content-wrapper">
        <div className="content-grid">
          <div className="main-column">
            <div className="main-feed">
              <div className="feed-sidebar-container">
                <div className="feed-sidebar">
                  <Link to="/myntrafeed" className="sidebar-button">Home</Link>
                  <Link to="/feedprofile" className="sidebar-button">Profile</Link>
                </div>
              </div>
              <div className="feed-content">
                <div className="feed-header">
                  <div className="search-container">
                    <div className="search-input">
                      <img src="/assets/search.webp" alt="Search" className="search-icon-small" />
                      <span className="search-text">Search</span>
                    </div>
                    <div className="feed-tabs">
                      <span className="active-tab">For you</span>
                      <div className="tab-indicator"></div>
                    </div>
                  </div>
                  <div className="feed-filters">
                    <span className="filter-option">Trending</span>
                    <span className="filter-option">Recent</span>
                  </div>
                </div>
                <div className="feed-grid">
                  <div className="grid-row">
                    <div className="grid-item" onClick={handleImageClick}>
                      <img src="/assets/slider/feed1.webp" alt="Feed Image 1" className="grid-image" />
                    </div>
                    <div className="grid-item">
                      <img src="/assets/slider/feed2.webp" alt="Feed Image 2" className="grid-image" />
                    </div>
                    <div className="grid-item">
                      <img src="/assets/slider/feed3.webp" alt="Feed Image 3" className="grid-image" />
                    </div>
                    <div className="grid-item">
                      <img src="/assets/slider/feed4.webp" alt="Feed Image 4" className="grid-image" />
                    </div>
                  </div>
                  <div className="grid-row">
                    <div className="grid-item">
                      <img src="/assets/slider/feed5.webp" alt="Feed Image 5" className="grid-image" />
                    </div>
                    <div className="grid-item">
                      <img src="/assets/slider/feed6.webp" alt="Feed Image 6" className="grid-image" />
                    </div>
                    <div className="grid-item">
                      <img src="/assets/slider/feed7.webp" alt="Feed Image 7" className="grid-image" />
                    </div>
                    <div className="grid-item">
                      <img src="/assets/slider/feed8.webp" alt="Feed Image 8" className="grid-image" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sidebar-column">
            <div className="create-post">
              <h2 className="create-post-header">Create new post</h2>
              <img
                src={selectedFiles.length > 0 ? URL.createObjectURL(selectedFiles[0]) : '/assets/slider/create2.webp.jpg'}
                alt="Upload"
                className="upload-icon"
              />
              <input
                id="file-input"
                type="file"
                multiple
                onChange={handleFileChange}
                className="upload-input"
              />
              <label htmlFor="file-input" className="upload-text">Drag photos and videos here</label>
              <button className="upload-button" onClick={() => document.getElementById('file-input').click()}>
                Select from computer
              </button>
              <button onClick={handleUpload} className="upload-button">
                Upload
              </button>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
          </div>
        </div>
      </div>
      {modalImage && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <span className="uploaded-by">UPLOADED BY: {userName}</span>
            </div>
            <span className="close-button" onClick={closeModal}>&times;</span>
            <img src={modalImage.src} alt={modalImage.alt} className="modal-image" />
            <div className="modal-footer">
              <button className={`like-button ${isLiked ? 'liked' : ''}`} onClick={handleLikeToggle}>
                <img src={isLiked ? "/assets/slider/likefilled.png" : "/assets/slider/likenotfilled.png"} alt="Like" className="like-icon" />
              </button>
              <span className="like-count">{likes} Likes</span>
              <span className="upload-date">Uploaded on: {modalImage.date}</span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default MyntraFeed;
