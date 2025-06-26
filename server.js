/**
 * PartSelect Chat Assistant - Backend Server
 * 
 * Developer: Bob Tianqi Wei
 * Project: Instalily AI Case Study
 * Date: June 2025
 * 
 * This server provides RESTful API endpoints for the PartSelect chat assistant,
 * including DeepSeek AI integration, product search, compatibility checks,
 * installation guides, and troubleshooting support.
 */

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { sampleProducts, compatibilityMatrix, installationGuides, troubleshootingGuides } = require('./src/data/sampleProducts.js');
const { DEEPSEEK_API_KEY, DEEPSEEK_API_URL } = require('./config.js');

const app = express();
app.use(cors());
app.use(express.json());

// 真实的DeepSeek API调用
const callDeepSeekAPI = async (userQuery, context = '') => {
  try {
    // 构建系统提示词，包含PartSelect的业务上下文
    const systemPrompt = `You are a helpful assistant for PartSelect, an e-commerce website specializing in refrigerator and dishwasher parts. 

Your role is to help customers with:
1. Product information and part searches
2. Compatibility checks between parts and appliance models
3. Installation guidance and instructions
4. Troubleshooting appliance issues

Available product data includes:
- Refrigerator parts: door shelf bins, ice makers, water filters
- Dishwasher parts: door latches, pump motors
- Installation guides with step-by-step instructions
- Troubleshooting guides for common issues

Always be helpful, accurate, and focused on appliance parts. If you don't have specific information about a part or model, suggest contacting customer service or checking the PartSelect website.

${context}`;

    const response = await axios.post(DEEPSEEK_API_URL, {
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: userQuery
        }
      ],
      max_tokens: 1000,
      temperature: 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 30000 // 30秒超时
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('DeepSeek API Error:', error.response?.data || error.message);
    
    // 如果API调用失败，回退到智能本地响应
    return await fallbackResponse(userQuery);
  }
};

// 回退响应函数（当DeepSeek API不可用时使用）
const fallbackResponse = async (userQuery) => {
  const query = userQuery.toLowerCase();
  
  // 检查是否是安装问题
  if (query.includes('install') || query.includes('installation')) {
    const partMatch = query.match(/part number (\w+)/i);
    if (partMatch) {
      const partNumber = partMatch[1];
      const guide = installationGuides[partNumber];
      if (guide) {
        return `Here's how to install part number ${partNumber}:\n\n**${guide.title}**\n\n**Difficulty:** ${guide.difficulty}\n**Time:** ${guide.time}\n\n**Steps:**\n${guide.steps.map((step, index) => `${index + 1}. ${step}`).join('\n')}\n\n**Tools needed:** ${guide.tools.join(', ')}`;
      }
    }
    return "I can help you with installation instructions. Please provide the part number you need help with.";
  }
  
  // 检查兼容性问题
  if (query.includes('compatible') || query.includes('compatibility')) {
    const modelMatch = query.match(/model (\w+)/i);
    if (modelMatch) {
      const modelNumber = modelMatch[1];
      const compatibility = compatibilityMatrix[modelNumber];
      if (compatibility) {
        const compatibleParts = [...compatibility.refrigerator, ...compatibility.dishwasher];
        return `Yes, I can help with compatibility for model ${modelNumber}. Here are the compatible parts:\n\n**Refrigerator parts:** ${compatibility.refrigerator.join(', ')}\n**Dishwasher parts:** ${compatibility.dishwasher.join(', ')}\n\nWould you like specific information about any of these parts?`;
      }
    }
    return "I can check part compatibility. Please provide your appliance model number.";
  }
  
  // 检查故障排除
  if (query.includes('not working') || query.includes('broken') || query.includes('fix')) {
    if (query.includes('ice maker')) {
      const guide = troubleshootingGuides['ice maker not working'];
      return `**${guide.title}**\n\n**Common causes:**\n${guide.commonCauses.map(cause => `• ${cause}`).join('\n')}\n\n**Troubleshooting steps:**\n${guide.steps.map((step, index) => `${index + 1}. ${step}`).join('\n')}\n\nIf these steps don't resolve the issue, you may need to replace the ice maker assembly (Part #PS11752779).`;
    }
    if (query.includes('dishwasher') && query.includes('drain')) {
      const guide = troubleshootingGuides['dishwasher not draining'];
      return `**${guide.title}**\n\n**Common causes:**\n${guide.commonCauses.map(cause => `• ${cause}`).join('\n')}\n\n**Troubleshooting steps:**\n${guide.steps.map((step, index) => `${index + 1}. ${step}`).join('\n')}\n\nIf the pump is faulty, you may need to replace it (Part #PS11752781).`;
    }
    return "I can help with troubleshooting. Please describe the specific issue you're experiencing with your appliance.";
  }
  
  // 产品搜索
  const partMatch = query.match(/part number (\w+)/i);
  if (partMatch) {
    const partNumber = partMatch[1];
    const product = sampleProducts.find(p => p.partNumber === partNumber);
    if (product) {
      return `**${product.name}**\n\n**Part Number:** ${product.partNumber}\n**Price:** $${product.price}\n**Stock:** ${product.stockQuantity} available\n**Category:** ${product.category}\n\n**Description:** ${product.description}\n\n**Installation:** ${product.installation}\n\n**Compatible models:** ${product.compatibility.join(', ')}`;
    }
  }
  
  // 默认响应
  return "I'm your PartSelect assistant! I can help you with:\n\n• **Product information** - Search for parts by part number\n• **Compatibility checks** - Verify if parts work with your model\n• **Installation guides** - Step-by-step installation instructions\n• **Troubleshooting** - Help diagnose and fix appliance issues\n\nWhat can I help you with today?";
};

// 智能响应处理函数
const processUserQuery = async (userQuery) => {
  const query = userQuery.toLowerCase();
  
  // 构建上下文信息
  let context = '';
  
  // 如果是产品相关查询，添加产品信息到上下文
  const partMatch = query.match(/part number (\w+)/i);
  if (partMatch) {
    const partNumber = partMatch[1];
    const product = sampleProducts.find(p => p.partNumber === partNumber);
    if (product) {
      context = `\nProduct Information:\n- Name: ${product.name}\n- Part Number: ${product.partNumber}\n- Price: $${product.price}\n- Category: ${product.category}\n- Description: ${product.description}\n- Installation: ${product.installation}\n- Compatible Models: ${product.compatibility.join(', ')}`;
    }
  }
  
  // 如果是兼容性查询，添加兼容性信息到上下文
  const modelMatch = query.match(/model (\w+)/i);
  if (modelMatch) {
    const modelNumber = modelMatch[1];
    const compatibility = compatibilityMatrix[modelNumber];
    if (compatibility) {
      context += `\nCompatibility Information for Model ${modelNumber}:\n- Refrigerator Parts: ${compatibility.refrigerator.join(', ')}\n- Dishwasher Parts: ${compatibility.dishwasher.join(', ')}`;
    }
  }
  
  // 调用DeepSeek API
  return await callDeepSeekAPI(userQuery, context);
};

// 聊天API
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    console.log('Processing user query:', message);
    const response = await processUserQuery(message);
    
    res.json({
      role: "assistant",
      content: response
    });
  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ 
      role: "assistant",
      content: "I'm sorry, I encountered an error. Please try again." 
    });
  }
});

// 产品搜索API
app.get('/api/products', (req, res) => {
  try {
    const { query, category } = req.query;
    
    let filteredProducts = sampleProducts;
    
    if (query) {
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.partNumber.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (category) {
      filteredProducts = filteredProducts.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    res.json(filteredProducts);
  } catch (error) {
    console.error('Product search error:', error);
    res.status(500).json({ error: 'Product search failed' });
  }
});

// 兼容性检查API
app.get('/api/compatibility', (req, res) => {
  try {
    const { modelNumber } = req.query;
    
    if (!modelNumber) {
      return res.status(400).json({ error: 'Model number is required' });
    }
    
    const compatibility = compatibilityMatrix[modelNumber];
    
    if (!compatibility) {
      return res.json({ 
        compatible: false, 
        message: `No compatibility data found for model ${modelNumber}` 
      });
    }
    
    const compatibleProducts = [
      ...compatibility.refrigerator.map(partNumber => 
        sampleProducts.find(p => p.partNumber === partNumber)
      ).filter(Boolean),
      ...compatibility.dishwasher.map(partNumber => 
        sampleProducts.find(p => p.partNumber === partNumber)
      ).filter(Boolean)
    ];
    
    res.json({
      compatible: true,
      modelNumber,
      refrigerator: compatibility.refrigerator,
      dishwasher: compatibility.dishwasher,
      products: compatibleProducts
    });
  } catch (error) {
    console.error('Compatibility check error:', error);
    res.status(500).json({ error: 'Compatibility check failed' });
  }
});

// 安装指南API
app.get('/api/installation/:partNumber', (req, res) => {
  try {
    const { partNumber } = req.params;
    const guide = installationGuides[partNumber];
    
    if (!guide) {
      return res.status(404).json({ error: 'Installation guide not found' });
    }
    
    res.json(guide);
  } catch (error) {
    console.error('Installation guide error:', error);
    res.status(500).json({ error: 'Failed to retrieve installation guide' });
  }
});

// 故障排除API
app.get('/api/troubleshooting', (req, res) => {
  try {
    const { issue } = req.query;
    
    if (!issue) {
      return res.status(400).json({ error: 'Issue description is required' });
    }
    
    const issueLower = issue.toLowerCase();
    let guide = null;
    
    if (issueLower.includes('ice maker')) {
      guide = troubleshootingGuides['ice maker not working'];
    } else if (issueLower.includes('dishwasher') && issueLower.includes('drain')) {
      guide = troubleshootingGuides['dishwasher not draining'];
    }
    
    if (!guide) {
      return res.json({ 
        message: "I can help with troubleshooting. Please describe the specific issue you're experiencing." 
      });
    }
    
    res.json(guide);
  } catch (error) {
    console.error('Troubleshooting error:', error);
    res.status(500).json({ error: 'Troubleshooting failed' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`PartSelect Chat Server running on port ${PORT}`);
  console.log(`Available endpoints:`);
  console.log(`- POST /api/chat - Chat with AI assistant`);
  console.log(`- GET /api/products - Search products`);
  console.log(`- GET /api/compatibility - Check part compatibility`);
  console.log(`- GET /api/installation/:partNumber - Get installation guide`);
  console.log(`- GET /api/troubleshooting - Get troubleshooting help`);
}); 