import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

// 聊天API
export const getAIMessage = async (userQuery) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/chat`, {
      message: userQuery
    });
    return response.data;
  } catch (error) {
    console.error('Chat API error:', error);
    return {
      role: "assistant",
      content: "I'm sorry, I'm having trouble connecting right now. Please try again later."
    };
  }
};

// 产品搜索API
export const searchProducts = async (query, category = null) => {
  try {
    const params = { query };
    if (category) params.category = category;
    
    const response = await axios.get(`${API_BASE_URL}/products`, { params });
    return response.data;
  } catch (error) {
    console.error('Product search error:', error);
    return [];
  }
};

// 兼容性检查API
export const checkCompatibility = async (modelNumber) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/compatibility`, {
      params: { modelNumber }
    });
    return response.data;
  } catch (error) {
    console.error('Compatibility check error:', error);
    return { compatible: false, message: 'Compatibility check failed' };
  }
};

// 安装指南API
export const getInstallationGuide = async (partNumber) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/installation/${partNumber}`);
    return response.data;
  } catch (error) {
    console.error('Installation guide error:', error);
    return null;
  }
};

// 故障排除API
export const getTroubleshootingHelp = async (issue) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/troubleshooting`, {
      params: { issue }
    });
    return response.data;
  } catch (error) {
    console.error('Troubleshooting error:', error);
    return { message: 'Troubleshooting help unavailable' };
  }
};
