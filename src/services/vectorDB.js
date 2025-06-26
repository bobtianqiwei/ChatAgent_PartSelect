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

// 配置Pinecone（需要从环境变量或配置文件获取）
const PINECONE_API_KEY = process.env.PINECONE_API_KEY || 'your-pinecone-api-key';
const PINECONE_INDEX_NAME = 'partselect-products';

class VectorDBService {
  constructor() {
    this.pinecone = null;
    this.index = null;
    this.isInitialized = false;
  }

  // 初始化Pinecone连接
  async initialize() {
    try {
      if (!PINECONE_API_KEY || PINECONE_API_KEY === 'your-pinecone-api-key') {
        console.log('Pinecone API key not configured, using mock vector search');
        return false;
      }

      this.pinecone = new Pinecone({
        apiKey: PINECONE_API_KEY,
      });

      // 检查索引是否存在，如果不存在则创建
      const indexes = await this.pinecone.listIndexes();
      const indexExists = indexes.some(index => index.name === PINECONE_INDEX_NAME);

      if (!indexExists) {
        console.log('Creating Pinecone index...');
        await this.pinecone.createIndex({
          name: PINECONE_INDEX_NAME,
          dimension: 1536, // OpenAI embedding维度
          metric: 'cosine',
        });
        
        // 等待索引准备就绪
        await new Promise(resolve => setTimeout(resolve, 60000)); // 等待1分钟
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

  // 生成文本的向量嵌入（使用模拟数据，实际项目中需要调用OpenAI API）
  async generateEmbedding(text) {
    // 模拟向量嵌入生成
    // 在实际项目中，这里应该调用OpenAI的text-embedding-ada-002模型
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
        
        return {
          score,
          metadata: {
            partNumber: product.partNumber,
            name: product.name,
            category: product.category,
            price: product.price,
            description: product.description,
            installation: product.installation,
            troubleshooting: product.troubleshooting,
            compatibility: product.compatibility
          }
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