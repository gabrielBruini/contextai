import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FaqRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(question: string, answer: string, embedding: number[]) {
    const vector = `[${embedding.join(',')}]`;

    await this.prisma.$executeRaw`
      INSERT INTO faq (
        id,
        question,
        answer,
        embedding
      )
      VALUES (
        ${randomUUID()}::uuid,
        ${question},
        ${answer},
        ${vector}::vector
      )
    `;
  }

  async similaritySearch(embedding: number[], limit = 5) {
    const vector = `[${embedding.join(',')}]`;

    return this.prisma.$queryRaw<
      {
        id: string;
        question: string;
        answer: string;
        similarity: number;
      }[]
    >`
      SELECT
        id,
        question,
        answer,
        1 - (
          embedding <=> ${vector}::vector
        ) AS similarity
      FROM faq
      ORDER BY embedding <=> ${vector}::vector
      LIMIT ${limit}
    `;
  }
}
