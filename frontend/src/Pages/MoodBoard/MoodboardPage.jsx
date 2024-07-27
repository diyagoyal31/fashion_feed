import React, { useState } from 'react';
import MetaData from '../../Components/MetaData';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './MoodboardPage.css';

const products = [
    { id: 1, title: 'Blue top', price: 500, image: '/assets/products/top1.jpg' },
    { id: 2, title: 'Pink top', price: 650, image: '/assets/products/top2.webp' },
    { id: 3, title: 'Skirt', price: 990, image: '/assets/products/bottoms2.webp' },
    { id: 4, title: 'Pant', price: 860, image: '/assets/products/bottoms1.webp' },
    { id: 5, title: 'Shoes', price: 750, image: '/assets/products/shoes1.webp' },
    { id: 6, title: 'Heels', price: 450, image: '/assets/products/shoes2.webp' }
];

const MoodboardPage = () => {
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const handlePriceChange = (event) => {
        setPriceRange([+event.target.min, +event.target.max]);
    };

    const handleProductClick = (product) => {
        setSelectedProducts((prevSelectedProducts) => {
            if (prevSelectedProducts.some(selected => selected.id === product.id)) {
                return prevSelectedProducts.filter(selected => selected.id !== product.id);
            } else if (prevSelectedProducts.length < 3) {
                return [...prevSelectedProducts, product];
            }
            return prevSelectedProducts;
        });
    };

    return (
        <>
            <MetaData title="Outfit Moodboard" />
            <main className="moodboard-section">
                <section className="moodboard-content">
                    <div className="moodboard-title">
                        <h1 className="title-text">Place<br />your<br />Outfits<br />Here</h1>
                    </div>
                    <div className="moodboard-images">
                        <div className="image-container">
                            <div className="main-image">
                                {selectedProducts.length > 0 && (
                                    <img src={selectedProducts[0].image} className="main-image-content" alt="Main outfit" />
                                )}
                            </div>
                            <div className="sub-images">
                                <div className="sub-images-row">
                                    {selectedProducts.slice(1).map((product, index) => (
                                        <div key={index} className="sub-image-container">
                                            <img src={product.image} className="sub-image-content" alt={product.title} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <section className="product-section">
                
                <div className="product-grid">
                    
                    <div className="product-list">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className={`product-card ${selectedProducts.some(selected => selected.id === product.id) ? 'selected' : ''}`}
                                onClick={() => handleProductClick(product)}
                            >
                                <div className="product-image-container">
                                    <img src={product.image} className="product-image-bg" alt={product.title} />
                                </div>
                                <h3 className="product-title">{product.title}</h3>
                                <p className="product-price">₹{product.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default MoodboardPage;