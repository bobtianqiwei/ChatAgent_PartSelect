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
  const [lastPartNumber, setLastPartNumber] = useState(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // intelligent message processing - prioritize DeepSeek API, while keeping special features
  const processUserQuery = async (userQuery) => {
    const query = userQuery.toLowerCase();
    let partNumber = null;
    // 1. recognize part number
    const partMatch = query.match(/part number (ps\d+)/i);
    if (partMatch) {
      partNumber = partMatch[1].toUpperCase();
      setLastPartNumber(partNumber);
      // actively search for product and display product card
      const products = await searchProducts(partNumber);
      if (products.length > 0 && onProductDisplay) {
        onProductDisplay(products[0]);
      }
    }
    // 2. recognize this part refers to
    if (!partNumber && /this part/.test(query) && lastPartNumber) {
      partNumber = lastPartNumber;
    }
    // 3. compatibility check
    if ((query.includes('compatible') || query.includes('compatibility')) && partNumber) {
      const modelMatch = query.match(/model (\w+)/i);
      if (modelMatch) {
        const modelNumber = modelMatch[1];
        const compatibilityData = await checkCompatibility(modelNumber);
        // check if partNumber is in compatibility list
        const isCompatible =
          (compatibilityData.refrigerator && compatibilityData.refrigerator.includes(partNumber)) ||
          (compatibilityData.dishwasher && compatibilityData.dishwasher.includes(partNumber));
        // search and display product card
        const products = await searchProducts(partNumber);
        if (products.length > 0 && onProductDisplay) {
          onProductDisplay(products[0]);
        }
        return {
          role: "assistant",
          content: isCompatible
            ? `Yes, part number ${partNumber} is compatible with model ${modelNumber}.`
            : `Sorry, part number ${partNumber} is NOT compatible with model ${modelNumber}.`,
          type: "compatibility",
          data: compatibilityData
        };
      }
    }
    // 4. other cases, go to original logic, pass context
    let aiResponse = await getAIMessage(userQuery, { lastPartNumber });
    return aiResponse;
  };

  const handleSend = async (input) => {
    if (input.trim() === "") return;
    setIsLoading(true);
    setMessages(prev => [...prev, { role: "user", content: input }]);
    setInput("");

    try {
      const query = input.toLowerCase();
      // 1. capture part number (regardless of context)
      let partNumber = null;
      const partNumberMatch = input.match(/ps\d{6,}/i);
      if (partNumberMatch) {
        partNumber = partNumberMatch[0].toUpperCase();
        setLastPartNumber(partNumber);
      } else if (lastPartNumber) {
        partNumber = lastPartNumber;
      }

      // 2. detect compatibility check
      if ((query.includes('compatible') || query.includes('compatibility')) && partNumber) {
        const modelMatch = query.match(/model (\w+)/i);
        if (modelMatch) {
          const modelNumber = modelMatch[1];
          setMessages(prev => [...prev, { role: "assistant", content: "Checking compatibility in the database..." }]);
          const compatibilityData = await checkCompatibility(modelNumber);
          const isCompatible =
            (compatibilityData.refrigerator && compatibilityData.refrigerator.includes(partNumber)) ||
            (compatibilityData.dishwasher && compatibilityData.dishwasher.includes(partNumber));
          setMessages(prev => [...prev, {
            role: "assistant",
            content: isCompatible
              ? `Yes, part number ${partNumber} is compatible with model ${modelNumber}.`
              : `Sorry, part number ${partNumber} is NOT compatible with model ${modelNumber}.`,
            type: "compatibility",
            data: compatibilityData
          }]);
          const deepSeekPrompt = `User asked: ${input}\nDatabase result: Part number ${partNumber} is ${isCompatible ? 'compatible' : 'NOT compatible'} with model ${modelNumber}. Please explain this result to the user in a helpful way.`;
          const aiResponse = await getAIMessage(deepSeekPrompt);
          setMessages(prev => [...prev, { role: "assistant", content: aiResponse.content }]);
          setIsLoading(false);
          return;
        }
      }

      // other cases go to original logic, pass context
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
              <CompatibilityChecker data={message.data} onProductDisplay={onProductDisplay} />
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
