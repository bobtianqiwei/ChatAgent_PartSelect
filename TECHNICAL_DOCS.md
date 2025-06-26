# PartSelect Chat Assistant - Technical Documentation

**Developer: Bob Tianqi Wei**  
**Project: Instalily AI Case Study**  
**Date: June 2025**

## 📋 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Frontend Architecture](#frontend-architecture)
3. [Backend Architecture](#backend-architecture)
4. [AI Integration](#ai-integration)
5. [Vector Database Integration](#vector-database-integration)
6. [API Documentation](#api-documentation)
7. [Data Models](#data-models)
8. [Error Handling](#error-handling)
9. [Performance Optimization](#performance-optimization)
10. [Deployment Guide](#deployment-guide)

---

## 🏗️ Architecture Overview

### System Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend│    │  Express Backend│    │   DeepSeek AI   │
│                 │◄──►│                 │◄──►│                 │
│  - Chat UI      │    │  - API Routes   │    │  - LLM Service  │
│  - Product Cards│    │  - AI Integration│   │  - Context Mgmt │
│  - Responsive   │    │  - Vector DB    │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   Pinecone      │
                       │   Vector DB     │
                       │  - Semantic     │
                       │    Search       │
                       └─────────────────┘
```

### Technology Stack
- **Frontend**: React 18, CSS3, Axios
- **Backend**: Node.js, Express.js
- **AI**: DeepSeek API
- **Database**: Pinecone (Vector DB)
- **Images**: SVG (Local Storage)

---

## 🎨 Frontend Architecture

### Component Structure
```
src/
├── components/
│   ├── ChatWindow.js          # Main chat interface
│   ├── ChatWindow.css         # Chat styling
│   ├── ProductCard.js         # Product display
│   ├── ProductCard.css        # Product styling
│   ├── CompatibilityChecker.js # Compatibility UI
│   └── CompatibilityChecker.css
├── api/
│   └── api.js                 # API client
├── data/
│   └── sampleProducts.js      # Mock data
└── services/
    └── vectorDB.js            # Vector DB service
```

### Key Components

#### ChatWindow.js
- **Purpose**: Main chat interface component
- **Features**: 
  - Real-time messaging
  - Typing indicators
  - Message history
  - Product display integration
- **State Management**: React hooks (useState, useEffect)
- **API Integration**: Axios for backend communication

#### ProductCard.js
- **Purpose**: Rich product information display
- **Features**:
  - Product images and details
  - Installation guides
  - Compatibility information
  - Interactive elements
- **Props**: product object, onProductDisplay callback

#### CompatibilityChecker.js
- **Purpose**: Display compatibility results
- **Features**:
  - Model-to-part compatibility
  - Compatible products grid
  - Interactive product selection
- **Props**: compatibility data, onProductDisplay callback

### State Management
```javascript
// Chat state
const [messages, setMessages] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [input, setInput] = useState("");

// Product state
const [currentProduct, setCurrentProduct] = useState(null);
```

---

## 🔧 Backend Architecture

### Server Structure
```
server.js
├── Express App Setup
├── Middleware Configuration
├── API Routes
├── AI Integration
├── Vector Database Service
└── Error Handling
```

### Core Modules

#### Express Server Setup
```javascript
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
```

#### API Routes
- `POST /api/chat` - AI chat endpoint
- `GET /api/products` - Product search
- `GET /api/compatibility/:partNumber` - Compatibility check
- `GET /api/installation/:partNumber` - Installation guide
- `GET /api/troubleshooting` - Troubleshooting help

### Middleware
- **CORS**: Cross-origin resource sharing
- **JSON Parser**: Request body parsing
- **Error Handler**: Global error management

---

## 🤖 AI Integration

### DeepSeek API Integration
```javascript
const callDeepSeekAPI = async (userQuery, context = '') => {
  const systemPrompt = `You are a specialized assistant for PartSelect...`;
  
  const response = await axios.post(DEEPSEEK_API_URL, {
    model: 'deepseek-chat',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userQuery }
    ],
    max_tokens: 1000,
    temperature: 0.7
  });
  
  return response.data.choices[0].message.content;
};
```

### System Prompt Design
- **Domain Focus**: Refrigerator and dishwasher parts only
- **Business Rules**: Clear scope limitations
- **Context Integration**: Product information and compatibility data
- **Error Handling**: Graceful fallback responses

### Context Management
- **Product Context**: Relevant product information from vector DB
- **User Context**: Previous messages and part numbers
- **Business Context**: PartSelect domain knowledge

---

## 🗄️ Vector Database Integration

### Pinecone Setup
```javascript
const { Pinecone } = require('@pinecone-database/pinecone');
const pinecone = new Pinecone({ apiKey: PINECONE_API_KEY });
```

### Vector Operations
- **Upsert**: Add/update product embeddings
- **Query**: Semantic search for relevant products
- **Index Management**: Automatic index creation

### Embedding Strategy
- **Product Embeddings**: Product name, description, category
- **Query Embeddings**: User search queries
- **Similarity Search**: Cosine similarity matching

---

## 📚 API Documentation

### Chat Endpoint
```http
POST /api/chat
Content-Type: application/json

{
  "message": "How can I install part number PS11752778?",
  "context": {
    "lastPartNumber": "PS11752778"
  }
}
```

**Response:**
```json
{
  "role": "assistant",
  "content": "Here's how to install part number PS11752778...",
  "type": "installation",
  "data": {
    "product": {...},
    "installation": {...}
  }
}
```

### Product Search Endpoint
```http
GET /api/products?query=water filter&category=refrigerator
```

**Response:**
```json
{
  "products": [
    {
      "partNumber": "PS11752778",
      "name": "Refrigerator Water Filter",
      "price": 24.99,
      "category": "refrigerator",
      "description": "..."
    }
  ]
}
```

### Compatibility Check Endpoint
```http
GET /api/compatibility/PS11752778?model=WDT780SAEM1
```

**Response:**
```json
{
  "compatible": true,
  "model": "WDT780SAEM1",
  "partNumber": "PS11752778",
  "compatibleProducts": [...]
}
```

---

## 📊 Data Models

### Product Model
```javascript
{
  partNumber: "PS11752778",
  name: "Refrigerator Water Filter",
  price: 24.99,
  stockQuantity: 50,
  category: "refrigerator",
  description: "High-quality water filter...",
  image: "/images/products/PS11752778-main.svg",
  installationImages: [
    "/images/products/PS11752778-install-1.svg",
    "/images/products/PS11752778-install-2.svg",
    "/images/products/PS11752778-install-3.svg"
  ],
  installation: {
    title: "Water Filter Installation",
    difficulty: "Easy",
    time: "15 minutes",
    steps: [...],
    tools: [...]
  },
  compatibility: ["WDT780SAEM1", "WDT750SAEM1"],
  videoUrl: "https://www.youtube.com/watch?v=..."
}
```

### Message Model
```javascript
{
  role: "user" | "assistant",
  content: "Message content",
  type: "chat" | "product" | "compatibility" | "installation",
  data: {}, // Additional data for specific message types
  timestamp: Date
}
```

### Compatibility Model
```javascript
{
  model: "WDT780SAEM1",
  refrigerator: ["PS11752778", "PS11752779"],
  dishwasher: ["PS11752780", "PS11752781"],
  compatibleProducts: [...]
}
```

---

## ⚠️ Error Handling

### API Error Handling
```javascript
try {
  const response = await callDeepSeekAPI(userQuery);
  return response;
} catch (error) {
  console.error('DeepSeek API Error:', error);
  return await fallbackResponse(userQuery);
}
```

### Frontend Error Handling
```javascript
const handleSend = async (input) => {
  try {
    setIsLoading(true);
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
```

### Fallback System
- **AI Fallback**: Local response generation when DeepSeek unavailable
- **Vector DB Fallback**: Keyword search when Pinecone unavailable
- **Image Fallback**: Default images when product images fail to load

---

## ⚡ Performance Optimization

### Frontend Optimizations
- **React.memo**: Component memoization for expensive renders
- **useCallback**: Memoized callback functions
- **Lazy Loading**: Image lazy loading for product cards
- **CSS Optimization**: Efficient CSS selectors and animations

### Backend Optimizations
- **Caching**: API response caching
- **Connection Pooling**: Database connection management
- **Compression**: Response compression
- **Rate Limiting**: API rate limiting

### Database Optimizations
- **Index Optimization**: Vector database index tuning
- **Query Optimization**: Efficient similarity search
- **Batch Operations**: Bulk upsert operations

---

## 🚀 Deployment Guide

### Environment Setup
```bash
# Production environment variables
NODE_ENV=production
DEEPSEEK_API_KEY=your-production-key
PINECONE_API_KEY=your-production-key
PORT=3001
```

### Build Process
```bash
# Install dependencies
npm install

# Build frontend
npm run build

# Start production server
npm start
```

### Deployment Options

#### Option 1: Heroku
```bash
# Create Heroku app
heroku create partselect-chat-assistant

# Set environment variables
heroku config:set DEEPSEEK_API_KEY=your-key
heroku config:set PINECONE_API_KEY=your-key

# Deploy
git push heroku main
```

#### Option 2: AWS
```bash
# EC2 deployment
sudo apt update
sudo apt install nodejs npm
npm install
npm start
```

#### Option 3: Docker
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

### Monitoring and Logging
- **Application Logs**: Winston logging
- **Error Tracking**: Sentry integration
- **Performance Monitoring**: New Relic or DataDog
- **Health Checks**: `/health` endpoint

---

## 🔒 Security Considerations

### API Security
- **Rate Limiting**: Prevent API abuse
- **Input Validation**: Sanitize user inputs
- **CORS Configuration**: Restrict cross-origin requests
- **Environment Variables**: Secure API key storage

### Data Security
- **HTTPS**: Secure communication
- **Data Encryption**: Sensitive data encryption
- **Access Control**: API access restrictions
- **Audit Logging**: Security event logging

---

## 📈 Scalability Considerations

### Horizontal Scaling
- **Load Balancing**: Multiple server instances
- **Database Sharding**: Vector database partitioning
- **CDN**: Static asset delivery
- **Microservices**: Service decomposition

### Performance Scaling
- **Caching Layer**: Redis for session and data caching
- **Database Optimization**: Query optimization and indexing
- **CDN Integration**: Global content delivery
- **Auto-scaling**: Cloud-based auto-scaling

---

## 🧪 Testing Strategy

### Unit Testing
- **Component Testing**: React component tests
- **API Testing**: Backend endpoint tests
- **Service Testing**: Business logic tests

### Integration Testing
- **End-to-End Testing**: Full user flow testing
- **API Integration**: External API testing
- **Database Integration**: Vector DB testing

### Performance Testing
- **Load Testing**: High-traffic simulation
- **Stress Testing**: System limits testing
- **Memory Testing**: Memory leak detection

---

## 📝 Development Guidelines

### Code Standards
- **ESLint**: JavaScript linting
- **Prettier**: Code formatting
- **TypeScript**: Type safety (future enhancement)
- **Git Hooks**: Pre-commit validation

### Documentation Standards
- **JSDoc**: Function documentation
- **API Documentation**: OpenAPI/Swagger
- **Architecture Documentation**: System design docs
- **README**: Project setup and usage

---

## 🔮 Future Enhancements

### Planned Features
- **User Authentication**: User accounts and chat history
- **Order Integration**: Shopping cart and checkout
- **Voice Chat**: Speech-to-text integration
- **Multi-language Support**: Internationalization

### Technical Improvements
- **TypeScript Migration**: Type safety
- **GraphQL API**: Flexible data fetching
- **Real-time Features**: WebSocket integration
- **Mobile App**: React Native application

---

**Document Version**: 1.0  
**Last Updated**: June 2025  
**Maintainer**: Bob Tianqi Wei 