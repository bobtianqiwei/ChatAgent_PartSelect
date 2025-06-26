/**
 * ChatWindow Component - Main Chat Interface
 * 
 * Developer: Bob Tianqi Wei
 * Project: Instalily AI Case Study
 * Date: June 2025
 * 
 * This component provides the main chat interface with AI integration,
 * product display, compatibility checking, and real-time messaging.
 */

import React, { useState, useRef, useEffect } from 'react';
import "./ChatWindow.css";
import { getAIMessage, searchProducts, checkCompatibility } from "../api/api";
import { marked } from "marked";
import ProductCard from "./ProductCard";
import CompatibilityCheck from "./CompatibilityCheck";

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Welcome to PartSelect! I'm your specialized assistant for refrigerator and dishwasher parts. 

I can help you with:
• Finding the right parts for your appliance
• Checking compatibility with your model
• Installation guides and instructions
• Troubleshooting common issues

What can I help you with today?`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [compatibilityData, setCompatibilityData] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Always try DeepSeek first
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      if (response.ok) {
        const data = await response.json();
        
        const assistantMessage = {
          role: 'assistant',
          content: data.content,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, assistantMessage]);

        // Check for product information in the response
        if (data.products && data.products.length > 0) {
          setProducts(data.products);
        }

        // Check for compatibility data
        if (data.compatibility) {
          setCompatibilityData(data.compatibility);
        }
      } else {
        throw new Error('Failed to get response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage = {
        role: 'assistant',
        content: `I apologize, but I'm having trouble connecting right now. Please try again in a moment, or contact our customer service for immediate assistance.`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: `Welcome back! I'm here to help with your refrigerator and dishwasher parts. What do you need assistance with?`,
        timestamp: new Date()
      }
    ]);
    setProducts([]);
    setCompatibilityData(null);
  };

  const getQuickActions = () => [
    { text: "Find refrigerator parts", action: () => setInputMessage("I need refrigerator parts") },
    { text: "Find dishwasher parts", action: () => setInputMessage("I need dishwasher parts") },
    { text: "Check compatibility", action: () => setInputMessage("How do I check if a part is compatible?") },
    { text: "Installation help", action: () => setInputMessage("I need installation instructions") }
  ];

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo">PartSelect</div>
            <div className="subtitle">Refrigerator & Dishwasher Parts Specialist</div>
          </div>
          <div className="scope-indicator">
            <span className="scope-badge">Refrigerator & Dishwasher Only</span>
          </div>
        </div>
        <button className="clear-chat-btn" onClick={clearChat}>
          Clear Chat
        </button>
      </div>

      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            <div className="message-content">
              <div className="message-text" dangerouslySetInnerHTML={{ __html: message.content.replace(/\n/g, '<br>') }} />
              <div className="message-timestamp">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="message assistant">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {products.length > 0 && (
        <div className="products-section">
          <h3>Related Products</h3>
          <div className="products-grid">
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      )}

      {compatibilityData && (
        <div className="compatibility-section">
          <CompatibilityCheck compatibilityData={compatibilityData} />
        </div>
      )}

      <div className="quick-actions">
        {getQuickActions().map((action, index) => (
          <button
            key={index}
            className="quick-action-btn"
            onClick={action.action}
          >
            {action.text}
          </button>
        ))}
      </div>

      <div className="chat-input">
        <div className="input-container">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about refrigerator or dishwasher parts..."
            disabled={isLoading}
            rows="1"
          />
          <button 
            onClick={handleSendMessage} 
            disabled={isLoading || !inputMessage.trim()}
            className="send-button"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>
        <div className="input-hint">
          💡 I can help with refrigerator and dishwasher parts only
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
