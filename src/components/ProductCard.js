import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  if (!product) return null;

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
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
        <div className="product-actions">
          <button className="btn-primary">Add to Cart</button>
          <button className="btn-secondary">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 