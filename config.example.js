/**
 * Configuration Example File
 * 
 * Developer: Bob Tianqi Wei
 * Project: Instalily AI Case Study
 * 
 * Copy this file to config.js and update with your actual API keys
 */

module.exports = {
  // DeepSeek API Configuration
  DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY || 'your-deepseek-api-key-here',
  DEEPSEEK_API_URL: process.env.DEEPSEEK_API_URL || 'https://api.deepseek.com/v1/chat/completions',
  
  // Pinecone Vector Database Configuration
  PINECONE_API_KEY: process.env.PINECONE_API_KEY || 'your-pinecone-api-key-here',
  
  // Server Configuration
  PORT: process.env.PORT || 3001,
  NODE_ENV: process.env.NODE_ENV || 'development'
}; 