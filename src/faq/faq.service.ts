import { Injectable } from '@nestjs/common';

import { FaqRepository } from './faq.repository';
import { EmbeddingService } from '../rag/embedding.service';

@Injectable()
export class FaqService {
  constructor(
    private readonly repository: FaqRepository,
    private readonly embeddingService: EmbeddingService,
  ) {}

  async create(question: string, answer: string) {
    const embedding = await this.embeddingService.embed(question);

    await this.repository.create(question, answer, embedding);
  }
}
