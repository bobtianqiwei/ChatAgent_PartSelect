# PartSelect Chat Assistant

A modern chat agent for the PartSelect e-commerce website, designed to help customers find refrigerator and dishwasher parts, check compatibility, and get installation guidance.

**Developer:** Bob Tianqi Wei  
**Project:** Instalily AI Case Study  
**Submission Date:** June 2025

## 🎯 Features

- **Smart Product Search**: Find parts by part number or description
- **Compatibility Checking**: Verify if parts work with specific appliance models
- **Installation Guides**: Step-by-step installation instructions
- **Troubleshooting Support**: Help diagnose and fix appliance issues
- **Modern UI**: Beautiful, responsive chat interface
- **Real-time Chat**: Instant responses with typing indicators
- **DeepSeek AI Integration**: Real AI-powered responses using DeepSeek language model

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- DeepSeek API key (optional, for enhanced AI responses)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd ChatAgent_PartSelect
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure DeepSeek API (Optional)**
Create a `config.js` file in the root directory:
```javascript
module.exports = {
  DEEPSEEK_API_KEY: 'your-api-key-here',
  DEEPSEEK_API_URL: 'https://api.deepseek.com/v1/chat/completions'
};
```

4. **Start the backend server**
```bash
node server.js
```
The backend will run on `http://localhost:3001`

5. **Start the frontend application**
```bash
npm start
```
The frontend will run on `http://localhost:3000`

## 📋 Example Queries & Test Cases

The chat assistant can handle various types of queries. Below are comprehensive test cases:

### ✅ Product Information Tests
- **Test Case 1:** "How can I install part number PS11752778?"
  - **Expected:** Detailed installation steps for Whirlpool Refrigerator Door Shelf Bin
  - **Features:** Step-by-step guide, difficulty level, time estimate, tools needed

- **Test Case 2:** "Tell me about part number PS11752779"
  - **Expected:** Product information for Ice Maker Assembly
  - **Features:** Price, stock, description, compatibility

- **Test Case 3:** "Search for refrigerator door shelf bin"
  - **Expected:** Product search results with relevant parts

### ✅ Compatibility Tests
- **Test Case 4:** "Is this part compatible with my WDT780SAEM1 model?"
  - **Expected:** Compatibility check results showing compatible parts
  - **Features:** Refrigerator and dishwasher parts compatibility

- **Test Case 5:** "What parts work with WDT750SAEM1?"
  - **Expected:** List of compatible parts for the specified model

### ✅ Troubleshooting Tests
- **Test Case 6:** "The ice maker on my Whirlpool fridge is not working. How can I fix it?"
  - **Expected:** Troubleshooting guide with common causes and solutions
  - **Features:** Step-by-step troubleshooting, common causes, part recommendations

- **Test Case 7:** "My dishwasher won't drain properly"
  - **Expected:** Drainage troubleshooting guide
  - **Features:** Problem diagnosis, solution steps, part replacement suggestions

### ✅ General Conversation Tests
- **Test Case 8:** "Hello, how are you?"
  - **Expected:** Friendly greeting with PartSelect context
  - **Features:** AI-powered natural conversation

- **Test Case 9:** "What can you help me with?"
  - **Expected:** Overview of available services
  - **Features:** Service description, capabilities explanation

### ✅ Edge Case Tests
- **Test Case 10:** "I need help with a washing machine"
  - **Expected:** Polite redirection to refrigerator/dishwasher focus
  - **Features:** Scope management, helpful redirection

- **Test Case 11:** "Part number ABC123"
  - **Expected:** "Part not found" response with helpful suggestions
  - **Features:** Error handling, user guidance

## 🏗️ Architecture

### Frontend
- **React 18**: Modern UI framework with hooks and functional components
- **CSS3**: Custom styling with responsive design
- **Axios**: HTTP client for API calls
- **Marked**: Markdown rendering for rich text responses

### Backend
- **Express.js**: RESTful API server with middleware support
- **CORS**: Cross-origin resource sharing enabled
- **DeepSeek API**: Real AI integration with fallback mechanisms
- **Modular Design**: Clean separation of concerns

### Data Structure
- **Sample Products**: Comprehensive mock database with 5+ products
- **Compatibility Matrix**: Model-to-part mappings for multiple appliance models
- **Installation Guides**: Detailed step-by-step instructions
- **Troubleshooting Guides**: Common issues and solutions

## 📁 Project Structure

```
src/
├── components/
│   ├── ChatWindow.js          # Main chat interface with AI integration
│   ├── ChatWindow.css         # Modern chat styling with animations
│   ├── ProductCard.js         # Product display component
│   ├── ProductCard.css        # Product card styling
│   ├── CompatibilityChecker.js # Compatibility display component
│   └── CompatibilityChecker.css
├── api/
│   └── api.js                 # API client functions with error handling
├── data/
│   └── sampleProducts.js      # Mock data with 5+ products
├── App.js                     # Main application component
└── App.css                    # Application styling with PartSelect branding

server.js                      # Backend server with DeepSeek integration
config.js                      # API configuration (create this file)
```

## 🔧 API Endpoints

### Chat
- `POST /api/chat` - Process user messages and return AI responses
  - **Input:** `{ "message": "user query" }`
  - **Output:** `{ "role": "assistant", "content": "AI response" }`

### Products
- `GET /api/products` - Search products by query or category
  - **Query params:** `query`, `category`
  - **Output:** Array of matching products

### Compatibility
- `GET /api/compatibility` - Check part compatibility with model numbers
  - **Query params:** `modelNumber`
  - **Output:** Compatibility data with product details

### Installation
- `GET /api/installation/:partNumber` - Get installation guide for specific part
  - **Path params:** `partNumber`
  - **Output:** Installation guide with steps and tools

### Troubleshooting
- `GET /api/troubleshooting` - Get troubleshooting help for issues
  - **Query params:** `issue`
  - **Output:** Troubleshooting guide with causes and solutions

## 🎨 Design Features

- **PartSelect Branding**: Consistent blue color scheme and professional styling
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface with smooth animations
- **Loading States**: Typing indicators and loading animations
- **Error Handling**: Graceful error messages and fallback responses
- **Accessibility**: Keyboard navigation and screen reader support

## 🔮 Technical Highlights

### AI Integration
- **Real DeepSeek API**: Live AI responses with intelligent context
- **Smart Fallback**: Local response system when API is unavailable
- **Context Awareness**: AI understands PartSelect business domain
- **Error Resilience**: Graceful handling of API failures

### Code Quality
- **Modular Architecture**: Clean separation of concerns
- **Error Handling**: Comprehensive error management
- **Performance Optimized**: Efficient rendering and API calls
- **Scalable Design**: Easy to extend with new features

### User Experience
- **Intuitive Interface**: Easy-to-use chat interface
- **Real-time Feedback**: Instant responses and loading states
- **Rich Content**: Product cards, compatibility checks, markdown rendering
- **Mobile Friendly**: Responsive design for all devices

## 🧪 Testing Guide

### Manual Testing Checklist

#### Setup Testing
- [ ] Backend server starts without errors
- [ ] Frontend application loads correctly
- [ ] API endpoints respond properly
- [ ] DeepSeek API integration works (if configured)

#### Functionality Testing
- [ ] Chat interface loads and displays correctly
- [ ] User can type and send messages
- [ ] AI responses are received and displayed
- [ ] Product cards render properly
- [ ] Compatibility checker works
- [ ] Loading states display correctly
- [ ] Error handling works for invalid inputs

#### Responsive Testing
- [ ] Interface works on desktop (1920x1080)
- [ ] Interface works on tablet (768x1024)
- [ ] Interface works on mobile (375x667)
- [ ] Chat bubbles resize appropriately
- [ ] Product cards adapt to screen size

#### API Testing
```bash
# Test chat endpoint
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"How can I install part number PS11752778?"}'

# Test product search
curl "http://localhost:3001/api/products?query=PS11752778"

# Test compatibility check
curl "http://localhost:3001/api/compatibility?modelNumber=WDT780SAEM1"
```

## 📝 Development Notes

### Adding New Products
Edit `src/data/sampleProducts.js` to add new products:
```javascript
{
  id: 6,
  partNumber: "PS11752783",
  name: "New Product Name",
  category: "Refrigerator",
  price: 29.99,
  // ... other properties
}
```

### Customizing AI Responses
Modify the system prompt in `server.js` to customize AI behavior:
```javascript
const systemPrompt = `You are a helpful assistant for PartSelect...`;
```

### Styling Changes
Update CSS files in the `src/components/` directory to modify appearance.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of the Instalily AI case study.  
**Developer:** Bob Tianqi Wei  
**All rights reserved.**

## 📞 Support

For questions about this implementation, please contact: iris@instalily.ai

---

**Project Status:** ✅ Complete and Ready for Submission  
**Last Updated:** June 2025  
**Developer:** Bob Tianqi Wei
