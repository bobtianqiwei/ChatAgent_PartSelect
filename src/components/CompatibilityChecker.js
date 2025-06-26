import React from 'react';
import './CompatibilityChecker.css';

const CompatibilityChecker = ({ data }) => {
  if (!data) return null;

  const { modelNumber, refrigerator, dishwasher, products } = data;

  return (
    <div className="compatibility-checker">
      <div className="compatibility-header">
        <h3>Compatibility Check Results</h3>
        <div className="model-number">
          <strong>Model:</strong> {modelNumber}
        </div>
      </div>
      
      <div className="compatibility-sections">
        <div className="compatibility-section">
          <h4>Refrigerator Parts</h4>
          <div className="part-list">
            {refrigerator.map((partNumber, index) => (
              <div key={index} className="part-item">
                <span className="part-number">{partNumber}</span>
                <span className="compatibility-status compatible">✓ Compatible</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="compatibility-section">
          <h4>Dishwasher Parts</h4>
          <div className="part-list">
            {dishwasher.map((partNumber, index) => (
              <div key={index} className="part-item">
                <span className="part-number">{partNumber}</span>
                <span className="compatibility-status compatible">✓ Compatible</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {products && products.length > 0 && (
        <div className="compatible-products">
          <h4>Compatible Products</h4>
          <div className="products-grid">
            {products.map((product, index) => (
              <div key={index} className="product-mini-card">
                <img src={product.image} alt={product.name} />
                <div className="product-mini-info">
                  <div className="product-mini-name">{product.name}</div>
                  <div className="product-mini-price">${product.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="compatibility-footer">
        <p className="disclaimer">
          * Compatibility is based on manufacturer specifications. Always verify fit before purchase.
        </p>
      </div>
    </div>
  );
};

export default CompatibilityChecker; 