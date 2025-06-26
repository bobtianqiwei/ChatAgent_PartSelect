# PartSelect Chat Assistant - Instalily AI Case Study

**Developer: Bob Tianqi Wei**  
**Date: June 2025**

A React-based chat assistant for PartSelect e-commerce website, specializing in refrigerator and dishwasher parts. Features DeepSeek AI integration, product search, compatibility checks, installation guides, and troubleshooting support.

## 🚀 Features

### Core Features ✅
- **AI-Powered Chat**: DeepSeek language model integration for intelligent responses
- **Product Search**: Search for refrigerator and dishwasher parts
- **Compatibility Checks**: Verify part compatibility with appliance models
- **Installation Guides**: Step-by-step installation instructions with visual guides
- **Troubleshooting Support**: Common appliance issue solutions
- **Modern UI/UX**: Responsive React interface with real-time chat
- **Product Images**: High-quality SVG product images and installation diagrams

### Advanced Features 🆕
- **Vector Database Integration**: Semantic search using Pinecone
- **Enhanced Product Discovery**: AI-powered product recommendations
- **Context-Aware Responses**: Relevant product information in AI responses
- **Visual Installation Guides**: Step-by-step installation with images and videos

## 🛠️ Technology Stack

- **Frontend**: React.js, CSS3
- **Backend**: Node.js, Express.js
- **AI**: DeepSeek API
- **Vector Database**: Pinecone (optional)
- **Images**: SVG graphics for products and installation guides
- **Development**: npm, Git

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm package manager
- DeepSeek API key
- Pinecone API key (optional, for vector database features)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bobtianqiwei/ChatAgent_PartSelect.git
   cd ChatAgent_PartSelect
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API keys**
   
   Copy `config.example.js` to `config.js` and update with your API keys:
   ```javascript
   module.exports = {
     DEEPSEEK_API_KEY: 'your-deepseek-api-key-here',
     DEEPSEEK_API_URL: 'https://api.deepseek.com/v1/chat/completions',
     PINECONE_API_KEY: 'your-pinecone-api-key-here', // Optional
     PORT: 3001,
     NODE_ENV: 'development'
   };
   ```

4. **Set up Pinecone (Optional)**
   
   For vector database features:
   - Sign up at [Pinecone](https://www.pinecone.io/)
   - Get your API key
   - Add it to `config.js`
   - The system will automatically create the index on first run

## 🖼️ Product Images

The application includes realistic product images and installation diagrams:

- **Product Images**: SVG graphics for each product with PartSelect branding
- **Installation Guides**: Step-by-step visual installation instructions
- **Local Storage**: All images are stored locally in `/public/images/products/`
- **No External Dependencies**: No CORS issues or external image loading problems

### Image Features
- High-quality SVG format for crisp display at any size
- PartSelect brand colors and styling
- Installation step diagrams with numbered instructions
- Product category icons (❄️ for refrigerators, 💧 for dishwashers)
- Responsive design that works on all devices

### Testing Images
Visit `http://localhost:3000/test-images.html` to test all product images.

## 🚀 Running the Application

1. **Start the backend server**
   ```bash
   npm start
   ```
   Server runs on http://localhost:3001

2. **Start the frontend (in a new terminal)**
   ```bash
   cd frontend
   npm start
   ```
   Frontend runs on http://localhost:3000

3. **Test images**
   ```bash
   # Open in browser
   http://localhost:3000/test-images.html
   ```

## 📚 API Endpoints

### Core Endpoints
- `POST /api/chat` - Send chat messages to AI
- `GET /api/products` - Search products
- `GET /api/compatibility/:partNumber` - Check part compatibility
- `GET /api/installation/:partNumber` - Get installation guide
- `GET /api/troubleshooting` - Get troubleshooting help

### Vector Database Endpoints (New)
- `GET /api/semantic-search?query=<search_term>&limit=<number>` - Semantic search
- `GET /api/products/enhanced?query=<search_term>&category=<category>` - Enhanced product search

## 🧪 Testing

Run the test cases in `test-cases.md` to verify functionality:

1. **Basic Chat Functionality**
   - Send messages and receive AI responses
   - Test product inquiries
   - Verify compatibility checks

2. **Product Search**
   - Search by part number
   - Search by category
   - Test semantic search (if Pinecone configured)

3. **Advanced Features**
   - Installation guide retrieval
   - Troubleshooting assistance
   - Vector database integration

## 🗄️ Vector Database Setup

### Option 1: Pinecone (Recommended)
1. Sign up at [Pinecone](https://www.pinecone.io/)
2. Create a new project
3. Get your API key
4. Add to `config.js`
5. Restart the server

### Option 2: Local ChromaDB
```bash
pip install chromadb
# Configure in vectorDB.js
```

### Option 3: Mock Mode
If no vector database is configured, the system automatically falls back to keyword-based search.

## 📁 Project Structure

```
ChatAgent_PartSelect/
├── src/
│   ├── components/
│   │   ├── ChatWindow.js      # Main chat interface
│   │   ├── ProductCard.js     # Product display component
│   │   └── CompatibilityCheck.js # Compatibility verification
│   ├── data/
│   │   └── sampleProducts.js  # Sample product database
│   └── services/
│       └── vectorDB.js        # Vector database service
├── server.js                  # Express backend server
├── config.js                  # API configuration
├── package.json
└── README.md
```

## 🔍 Usage Examples

### Chat with AI
```
User: "I need a water filter for my refrigerator"
AI: "I can help you find a water filter. What's your refrigerator model?"
```

### Product Search
```
GET /api/products?query=water filter&category=refrigerator
```

### Semantic Search
```
GET /api/semantic-search?query=ice maker not working&limit=5
```

## 🛠️ Development

### Adding New Products
Edit `src/data/sampleProducts.js` to add new products to the database.

### Customizing AI Responses
Modify the system prompt in `server.js` to adjust AI behavior.

### Extending Vector Database
Update `src/services/vectorDB.js` to add new search capabilities.

## 📝 Notes

- The application uses sample data for demonstration
- DeepSeek API requires a valid API key with sufficient balance
- Vector database features are optional and fall back gracefully
- All responses are in English

## 🤝 Contributing

This is a case study project by Bob Tianqi Wei for Instalily AI.

## 📄 License

This project is created for educational and demonstration purposes.

---

**Developer: Bob Tianqi Wei**  
**Project: Instalily AI Case Study**  
**Date: June 2025**
