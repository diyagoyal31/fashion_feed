import React, { createContext, useState } from 'react';

const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState([]);

  const addImages = (newImages) => {
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const deleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <ImageContext.Provider value={{ images, addImages, deleteImage }}>
      {children}
    </ImageContext.Provider>
  );
};

export default ImageContext;
