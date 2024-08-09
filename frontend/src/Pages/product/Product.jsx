import React, { useState, useEffect } from "react";
import "./Product.css";
import { useLocation } from "react-router-dom";
import MetaData from "../../Components/MetaData";

// Dummy product data
const allProducts = [
  { id: 1, name: "Women Blue Top", price: 450, imageUrl: "../../.././assets/products/top1.jpg" },
 
  
  // Add more products here if needed
];

// Define products per page
const PRODUCTS_PER_PAGE = 15;

const Product = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('gender') || queryParams.get('category');

  // State for pagination and sorting
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('price-asc');

  // Filter products based on category
  const filteredProducts = category === 'women' || category === 'tops' ? allProducts : [];

  // Sort products based on the selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      
      default:
        return 0;
    }
  });

  // Calculate total pages
  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);

  // Get products for the current page
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const productsToDisplay = sortedProducts.slice(startIndex, endIndex);

  // Handler for previous page
  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  // Handler for next page
  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  // Handler for sort change
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div className="productCon">
      <MetaData title={`${category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Products'} Page`} />
      <div className="proContainer">
        <div className="proNavigation">
          <span>Home</span> &gt; <span>{category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Products'}</span>
        </div>
        <div className="proCount">
          <span>Showing</span> {productsToDisplay.length} <span>Products</span>
        </div>
        <div className="proSort">
          <div>
            <span>Sort by:</span>
            <select value={sortOption} onChange={handleSortChange}>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              
            </select>
          </div>
        </div>
        <div className="proBox">
          <div className="proFilters">
            {/* Add filter options here */}
          </div>
          <div className="proGrid">
            {productsToDisplay.length > 0 ? (
              productsToDisplay.map((product) => (
                <div key={product.id}>
                  <img src={product.imageUrl} alt={product.name} />
                  <p className="productName">{product.name}</p>
                  <p className="productPrice">Rs. {product.price.toFixed(2)}</p>
                  <button className="add-to-moodboard">Add to Moodboard</button>
                </div>
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>
        </div>
        <div className="pagination">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            &lt; Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
