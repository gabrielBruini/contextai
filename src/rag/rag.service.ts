import { Injectable } from '@nestjs/common';
import ollama from 'ollama';

import { EmbeddingService } from './embedding.service';
import { FaqRepository } from '../faq/faq.repository';

@Injectable()
export class RagService {
  constructor(
    private readonly embeddingService: EmbeddingService,
    private readonly faqRepository: FaqRepository,
  ) {}

  async ask(question: string) {
    const embedding = await this.embeddingService.embed(question);

    const matches = await this.faqRepository.similaritySearch(embedding);

    const relevantMatches = matches.filter((match) => match.similarity > 0.7);

    if (!relevantMatches.length) {
      return {
        answer: 'Não encontrei essa informação.',
      };
    }

    const context = relevantMatches
      .map(
        (match, index) => `
FAQ ${index + 1}

Pergunta:
${match.question}

Resposta:
${match.answer}
`,
      )
      .join('\n\n');

    const prompt = `
Você é um assistente de suporte.

Use SOMENTE o contexto abaixo.

Não invente informações.

Contexto:
${context}

Pergunta:
${question}
`;

    const response = await ollama.chat({
      model: 'phi3',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      options: {
        temperature: 0.2,
      },
    });

    return {
      answer: response.message.content,
      sources: relevantMatches.map((match) => ({
        question: match.question,
        similarity: match.similarity,
      })),
    };
  }
}
