import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ImageContext from './ImageContext';
import './MyntraFeed.css';

const MyntraFeed = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { addImages } = useContext(ImageContext);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const handleUpload = () => {
    const imageUrls = selectedFiles.map(file => URL.createObjectURL(file));
    addImages(imageUrls);
    navigate('/feedprofile');
  };

  return (
    <main className="main-content">
      <div className="content-wrapper">
        <div className="content-grid">
          <div className="main-column">
            <div className="main-feed">
              <div className="feed-sidebar-container">
                {/* Responsive Sidebar */}
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
                    <div className="grid-item">
                      <img src="/assets/slider/feed1.webp" alt="Feed Image 1" className="grid-image" />
                    </div>
                    <div className="grid-item">
                      <div className="blurred-item">
                        <img src="/assets/slider/feed2.webp" alt="Blurred Feed Image" className="blurred-image" />
                        <div className="like-container">
                          <img src="/assets/slider/like.webp" alt="Like" className="like-icon" />
                        </div>
                      </div>
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
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyntraFeed;
