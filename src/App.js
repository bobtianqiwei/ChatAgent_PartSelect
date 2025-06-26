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

import React from "react";
import "./App.css";
import ChatWindow from "./components/ChatWindow";

function App() {
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
      <div className="main-content">
        <ChatWindow />
      </div>
      <div className="footer">
        <p>© 2024 PartSelect. All rights reserved.</p>
      </div>
    </div>
  );
}

export default App;
