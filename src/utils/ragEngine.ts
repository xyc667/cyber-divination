import { knowledgeBase, KnowledgeItem } from './ragKnowledgeBase';

interface Embedding {
  id: string;
  vector: number[];
}

class RAGEngine {
  private embeddings: Embedding[] = [];
  
  constructor() {
    this.initializeEmbeddings();
  }
  
  private initializeEmbeddings() {
    knowledgeBase.forEach(item => {
      this.embeddings.push({
        id: item.id,
        vector: this.generateEmbedding(item)
      });
    });
  }
  
  private generateEmbedding(item: KnowledgeItem): number[] {
    const text = item.title + ' ' + item.content + ' ' + item.keywords.join(' ');
    let hash = 0;
    const vector: number[] = [];
    
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    
    for (let i = 0; i < 10; i++) {
      vector.push(((hash >> (i * 3)) & 0xFF) / 255);
    }
    
    return vector;
  }
  
  private cosineSimilarity(vecA: number[], vecB: number[]): number {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    
    for (let i = 0; i < Math.min(vecA.length, vecB.length); i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }
    
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }
  
  search(query: string, topK: number = 5): KnowledgeItem[] {
    const queryVector = this.generateEmbedding({
      id: 'query',
      title: query,
      content: query,
      category: '',
      keywords: query.split(/\s+/)
    });
    
    const similarities = this.embeddings.map(embedding => ({
      id: embedding.id,
      similarity: this.cosineSimilarity(queryVector, embedding.vector)
    }));
    
    similarities.sort((a, b) => b.similarity - a.similarity);
    
    const results: KnowledgeItem[] = [];
    const seen = new Set<string>();
    
    for (const sim of similarities) {
      if (sim.similarity > 0.1 && !seen.has(sim.id)) {
        const item = knowledgeBase.find(k => k.id === sim.id);
        if (item) {
          results.push(item);
          seen.add(sim.id);
        }
      }
      if (results.length >= topK) break;
    }
    
    return results;
  }
  
  generateAnswer(query: string): { answer: string; sources: KnowledgeItem[] } {
    const sources = this.search(query, 3);
    
    if (sources.length === 0) {
      return {
        answer: `关于「${query}」的问题，我正在学习中。您可以尝试询问其他占卜相关的话题。`,
        sources: []
      };
    }
    
    const context = sources.map(s => s.content).join('\n\n');
    
    let answer = '';
    
    if (query.includes('是什么') || query.includes('什么是') || query.includes('定义')) {
      answer = sources[0].content;
    } else if (query.includes('如何') || query.includes('怎么') || query.includes('方法')) {
      const howTo = sources.find(s => s.content.includes('方法') || s.content.includes('步骤') || s.content.includes('通过'));
      answer = howTo ? howTo.content : sources[0].content;
    } else if (query.includes('含义') || query.includes('意思')) {
      answer = sources[0].content;
    } else {
      answer = `根据知识库，${sources[0].title}：\n\n${sources[0].content}`;
    }
    
    return { answer, sources };
  }
}

export const ragEngine = new RAGEngine();
