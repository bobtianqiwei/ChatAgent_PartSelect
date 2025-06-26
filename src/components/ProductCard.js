import React, { useState } from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [showInstallation, setShowInstallation] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) return null;

  const handleImageError = (e) => {
    // 如果真实图片加载失败，使用占位符
    e.target.src = `https://via.placeholder.com/200x150?text=${product.partNumber}`;
  };

  const nextImage = () => {
    if (product.installationImages && product.installationImages.length > 0) {
      setCurrentImageIndex((prev) => 
        (prev + 1) % product.installationImages.length
      );
    }
  };

  const prevImage = () => {
    if (product.installationImages && product.installationImages.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? product.installationImages.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img 
          src={product.image} 
          alt={product.name}
          onError={handleImageError}
        />
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        
        <div className="product-details">
          <div className="product-number">
            <strong>Part #:</strong> {product.partNumber}
          </div>
          <div className="product-price">
            <strong>Price:</strong> ${product.price}
          </div>
          <div className="product-stock">
            <strong>Stock:</strong> {product.stockQuantity} available
          </div>
          <div className="product-category">
            <strong>Category:</strong> {product.category}
          </div>
        </div>
        
        <div className="product-description">
          {product.description}
        </div>
        
        <div className="product-compatibility">
          <strong>Compatible models:</strong> {product.compatibility.join(', ')}
        </div>

        {/* 安装指南部分 */}
        <div className="installation-section">
          <button 
            className="installation-toggle"
            onClick={() => setShowInstallation(!showInstallation)}
          >
            {showInstallation ? 'Hide' : 'Show'} Installation Guide
          </button>
          
          {showInstallation && (
            <div className="installation-content">
              <h4>Installation Instructions</h4>
              <p>{product.installation}</p>
              
              {/* 安装图片轮播 */}
              {product.installationImages && product.installationImages.length > 0 && (
                <div className="installation-images">
                  <h5>Installation Steps</h5>
                  <div className="image-carousel">
                    <button className="carousel-btn prev" onClick={prevImage}>
                      ‹
                    </button>
                    <img 
                      src={product.installationImages[currentImageIndex]} 
                      alt={`Installation step ${currentImageIndex + 1}`}
                      onError={handleImageError}
                    />
                    <button className="carousel-btn next" onClick={nextImage}>
                      ›
                    </button>
                  </div>
                  <div className="image-counter">
                    {currentImageIndex + 1} / {product.installationImages.length}
                  </div>
                </div>
              )}
              
              {/* 安装视频 */}
              {product.installationVideo && (
                <div className="installation-video">
                  <h5>Installation Video</h5>
                  <a 
                    href={product.installationVideo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="video-link"
                  >
                    📹 Watch Installation Video
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="product-actions">
          <a 
            href={product.partSelectUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary"
          >
            View on PartSelect
          </a>
          <button className="btn-secondary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 