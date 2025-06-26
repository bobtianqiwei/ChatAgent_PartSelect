/**
 * PartSelect Chat Assistant - Main Application Component
 * 
 * Developer: Bob Tianqi Wei
 * Project: Instalily AI Case Study
 * Date: June 2025
 * 
 * This is the main React application component that renders the chat interface
 * with PartSelect branding and integrates all chat functionality.
 */

import React, { useState } from "react";
import "./App.css";
import ChatWindow from "./components/ChatWindow";
import ProductCard from "./components/ProductCard";
import { sampleProducts } from "./data/sampleProducts";

function App() {
  const [currentProduct, setCurrentProduct] = useState(null);

  // 当聊天中触发产品显示时，更新当前产品
  const handleProductDisplay = (product) => {
    setCurrentProduct(product);
  };

  // 控制 sidebar 显示
  const showSidebar = !!currentProduct;

  return (
    <div className="App">
      <div className="header">
        <div className="logo">
          <span className="logo-text">PartSelect</span>
          <span className="logo-subtitle">Chat Assistant</span>
        </div>
        <div className="header-info">
          <p>Your expert guide for refrigerator and dishwasher parts</p>
        </div>
      </div>
      
      <div
        className="main-content"
        style={{
          gap: `var(--bubble-padding)` // sidebar和chat-area之间的距离等于气泡到边缘距离
        }}
      >
        {showSidebar && (
          <aside
            className="sidebar"
            style={{
              marginLeft: "var(--main-side-padding)", // sidebar左边距
              marginRight: 0
            }}
          >
            <div className="sidebar-header">
              <h3>Product Information</h3>
              <p>Selected parts will appear here</p>
            </div>
            <div className="product-area">
              {currentProduct ? (
                <ProductCard product={currentProduct} />
              ) : (
                <div className="no-product">
                  <div className="no-product-icon">🛠️</div>
                  <h4>No Product Selected</h4>
                  <p>Ask about a specific part number to see product details here</p>
                  <div className="example-queries">
                    <p><strong>Try asking:</strong></p>
                    <ul>
                      <li>"Tell me about part number PS11752778"</li>
                      <li>"Search for refrigerator door bin"</li>
                      <li>"Show me ice maker parts"</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </aside>
        )}
        <section
          className={`chat-area ${showSidebar ? '' : 'chat-area-center'}`}
          style={{
            marginRight: showSidebar ? "var(--main-side-padding)" : "var(--main-side-padding)", // chat-area右边距
            marginLeft: 0
          }}
        >
          <ChatWindow onProductDisplay={handleProductDisplay} />
        </section>
      </div>
      
      <div className="footer">
        <p>© 2024 PartSelect. All rights reserved.</p>
      </div>
    </div>
  );
}

export default App;
