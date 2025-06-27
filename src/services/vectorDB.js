/**
 * Vector Database Service for Semantic Search
 * 
 * Developer: Bob Tianqi Wei
 * Project: Instalily AI Case Study
 * Date: June 2025
 * 
 * This service provides semantic search capabilities using Pinecone vector database
 * to enhance product search and AI responses with relevant context.
 */

const { Pinecone } = require('@pinecone-database/pinecone');
const OpenAI = require('openai');
const config = require('../../config.js');

// 配置Pinecone（从config.js文件获取）
const PINECONE_API_KEY = config.PINECONE_API_KEY;
const PINECONE_INDEX_NAME = 'partselect-products';

// 配置OpenAI（用于生成向量嵌入）
const OPENAI_API_KEY = config.OPENAI_API_KEY;
let openai = null;

// 初始化OpenAI客户端
function initializeOpenAI() {
  if (OPENAI_API_KEY && OPENAI_API_KEY !== 'your-openai-api-key') {
    openai = new OpenAI({
      apiKey: OPENAI_API_KEY,
    });
    console.log('OpenAI client initialized for embeddings');
    return true;
  }
  console.log('OpenAI API key not configured, using mock embeddings');
  return false;
}

class VectorDBService {
  constructor() {
    this.pinecone = null;
    this.index = null;
    this.isInitialized = false;
    this.openaiEnabled = initializeOpenAI();
  }

  // 初始化Pinecone连接
  async initialize() {
    try {
      if (!PINECONE_API_KEY || PINECONE_API_KEY === 'your-pinecone-api-key') {
        console.log('Pinecone API key not configured, using mock vector search');
        return false;
      }

      console.log('Initializing Pinecone with API key:', PINECONE_API_KEY.substring(0, 10) + '...');
      
      this.pinecone = new Pinecone({
        apiKey: PINECONE_API_KEY,
      });

      // 检查索引是否存在，如果不存在则创建
      const indexes = await this.pinecone.listIndexes();
      const indexNames = indexes.indexes || [];
      const indexExists = indexNames.includes(PINECONE_INDEX_NAME);

      if (!indexExists) {
        console.log('Creating Pinecone index...');
        try {
          await this.pinecone.createIndex({
            name: PINECONE_INDEX_NAME,
            dimension: 1536, // OpenAI embedding维度
            metric: 'cosine',
            spec: {
              serverless: {
                cloud: 'aws',
                region: 'us-east-1'
              }
            }
          });
          // 等待索引准备就绪
          console.log('Waiting for index to be ready...');
          await new Promise(resolve => setTimeout(resolve, 60000)); // 等待1分钟
        } catch (error) {
          if (error.message && error.message.includes('ALREADY_EXISTS')) {
            console.log('Pinecone index already exists, skipping creation.');
          } else {
            throw error;
          }
        }
      }

      this.index = this.pinecone.index(PINECONE_INDEX_NAME);
      this.isInitialized = true;
      console.log('Pinecone vector database initialized successfully');
      return true;
    } catch (error) {
      console.error('Failed to initialize Pinecone:', error);
      return false;
    }
  }

  // 生成文本的向量嵌入（使用真实的OpenAI API或模拟数据）
  async generateEmbedding(text) {
    if (this.openaiEnabled && openai) {
      try {
        const response = await openai.embeddings.create({
          model: "text-embedding-ada-002",
          input: text,
        });
        return response.data[0].embedding;
      } catch (error) {
        console.error('OpenAI embedding API error:', error);
        // 如果OpenAI API失败，回退到模拟embedding
        console.log('Falling back to mock embedding');
      }
    }
    
    // 模拟向量嵌入生成（当OpenAI不可用时使用）
    const mockEmbedding = new Array(1536).fill(0).map(() => Math.random() - 0.5);
    return mockEmbedding;
  }

  // 将产品数据转换为向量并存储
  async upsertProducts(products) {
    if (!this.isInitialized) {
      console.log('Vector database not initialized, skipping upsert');
      return;
    }

    try {
      const vectors = [];
      
      for (const product of products) {
        // 为每个产品创建多个向量（不同角度的描述）
        const productTexts = [
          `${product.name} ${product.description}`,
          `${product.partNumber} ${product.category}`,
          `${product.installation} ${product.troubleshooting}`,
          `compatible with ${product.compatibility.join(' ')}`
        ];

        for (let i = 0; i < productTexts.length; i++) {
          const embedding = await this.generateEmbedding(productTexts[i]);
          vectors.push({
            id: `${product.partNumber}-${i}`,
            values: embedding,
            metadata: {
              partNumber: product.partNumber,
              name: product.name,
              category: product.category,
              price: product.price,
              description: product.description,
              installation: product.installation,
              troubleshooting: product.troubleshooting,
              compatibility: product.compatibility,
              textType: ['name-desc', 'part-category', 'install-trouble', 'compatibility'][i]
            }
          });
        }
      }

      // 批量插入向量
      await this.index.upsert(vectors);
      console.log(`Successfully upserted ${vectors.length} vectors for ${products.length} products`);
    } catch (error) {
      console.error('Failed to upsert products to vector database:', error);
    }
  }

  // 语义搜索产品
  async semanticSearch(query, topK = 5) {
    if (!this.isInitialized) {
      console.log('Vector database not initialized, using mock search');
      return this.mockSemanticSearch(query, topK);
    }

    try {
      const queryEmbedding = await this.generateEmbedding(query);
      
      const searchResponse = await this.index.query({
        vector: queryEmbedding,
        topK: topK,
        includeMetadata: true
      });

      // 处理搜索结果
      const results = searchResponse.matches.map(match => ({
        score: match.score,
        metadata: match.metadata
      }));

      return results;
    } catch (error) {
      console.error('Semantic search failed:', error);
      return this.mockSemanticSearch(query, topK);
    }
  }

  // 模拟语义搜索（当向量数据库不可用时使用）
  mockSemanticSearch(query, topK = 5) {
    const { sampleProducts } = require('../data/sampleProducts.js');
    const queryLower = query.toLowerCase();
    
    // 简单的关键词匹配
    const results = sampleProducts
      .map(product => {
        const productText = `${product.name} ${product.description} ${product.partNumber}`.toLowerCase();
        const score = queryLower.split(' ').reduce((total, word) => {
          return total + (productText.includes(word) ? 1 : 0);
        }, 0) / queryLower.split(' ').length;
        // 返回所有字段，防止ProductCard缺字段
        return {
          score,
          metadata: { ...product }
        };
      })
      .filter(result => result.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);

    return results;
  }

  // 获取相关产品用于AI上下文
  async getRelevantProducts(query, limit = 3) {
    const searchResults = await this.semanticSearch(query, limit);
    
    // 去重并格式化结果
    const uniqueProducts = [];
    const seenPartNumbers = new Set();
    
    for (const result of searchResults) {
      if (!seenPartNumbers.has(result.metadata.partNumber)) {
        seenPartNumbers.add(result.metadata.partNumber);
        uniqueProducts.push({
          partNumber: result.metadata.partNumber,
          name: result.metadata.name,
          category: result.metadata.category,
          price: result.metadata.price,
          description: result.metadata.description,
          installation: result.metadata.installation,
          compatibility: result.metadata.compatibility,
          relevanceScore: result.score
        });
      }
    }
    
    return uniqueProducts;
  }
}

// 创建单例实例
const vectorDBService = new VectorDBService();

module.exports = vectorDBService; 