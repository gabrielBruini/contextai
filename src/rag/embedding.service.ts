import { Injectable } from '@nestjs/common';
import ollama from 'ollama';

@Injectable()
export class EmbeddingService {
  async embed(text: string): Promise<number[]> {
    const response = await ollama.embeddings({
      model: 'nomic-embed-text',
      prompt: text,
    });

    return response.embedding;
  }
}
