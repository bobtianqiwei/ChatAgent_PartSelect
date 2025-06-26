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

import React, { useState, useEffect, useRef } from "react";
import "./ChatWindow.css";
import { getAIMessage, searchProducts, checkCompatibility } from "../api/api";
import { marked } from "marked";
import CompatibilityChecker from "./CompatibilityChecker";

function ChatWindow({ onProductDisplay }) {
  const defaultMessage = [{
    role: "assistant",
    content: "Hi! I'm your PartSelect assistant. I can help you find refrigerator and dishwasher parts, check compatibility, and provide installation guidance. How can I help you today?"
  }];

  const [messages, setMessages] = useState(defaultMessage);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 智能消息处理 - 优先使用DeepSeek API，同时保留特殊功能
  const processUserQuery = async (userQuery) => {
    const query = userQuery.toLowerCase();
    
    // 首先尝试获取DeepSeek AI响应
    let aiResponse = await getAIMessage(userQuery);
    
    // 检查是否需要显示产品卡片
    if (query.includes('part number') || query.includes('search for')) {
      const partMatch = query.match(/part number (\w+)/i);
      if (partMatch) {
        const partNumber = partMatch[1];
        const products = await searchProducts(partNumber);
        if (products.length > 0) {
          // 通知父组件显示产品
          if (onProductDisplay) {
            onProductDisplay(products[0]);
          }
          return {
            ...aiResponse,
            type: "product",
            product: products[0]
          };
        }
      }
    }
    
    // 检查是否需要显示兼容性检查
    if (query.includes('compatible') || query.includes('compatibility')) {
      const modelMatch = query.match(/model (\w+)/i);
      if (modelMatch) {
        const modelNumber = modelMatch[1];
        const compatibilityData = await checkCompatibility(modelNumber);
        if (compatibilityData.compatible) {
          return {
            ...aiResponse,
            type: "compatibility",
            data: compatibilityData
          };
        }
      }
    }
    
    // 返回DeepSeek AI响应
    return aiResponse;
  };

  const handleSend = async (input) => {
    if (input.trim() === "") return;
    
    setIsLoading(true);
    setMessages(prev => [...prev, { role: "user", content: input }]);
    setInput("");

    try {
      const response = await processUserQuery(input);
      setMessages(prev => [...prev, response]);
    } catch (error) {
      console.error('Error processing message:', error);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-window">
      <div className="messages-scroll-area">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.role === 'user' ? 'user-message' : 'bot-message'}`}
            style={{ alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start' }}
          >
            <div dangerouslySetInnerHTML={{__html: marked(message.content)}}></div>
            {message.type === 'product' && (
              <div className="product-notification">
                <span>✅ Product information displayed in the sidebar</span>
              </div>
            )}
            {message.type === 'compatibility' && (
              <CompatibilityChecker data={message.data} />
            )}
          </div>
        ))}
        {isLoading && (
          <div className="message bot-message">
            <div className="loading-message">
              <div className="typing-indicator">
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                PartSelect Assistant is typing...
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about parts, compatibility, or installation..."
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              handleSend(input);
              e.preventDefault();
            }
          }}
          disabled={isLoading}
        />
        <button 
          className="send-button"
          onClick={() => handleSend(input)}
          disabled={isLoading}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;
