import { Module } from '@nestjs/common';
import { FaqController } from './faq.controller';
import { FaqService } from './faq.service';
import { FaqRepository } from './faq.repository';
import { EmbeddingService } from '../rag/embedding.service';
import { RagService } from '../rag/rag.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FaqController],
  providers: [FaqService, FaqRepository, EmbeddingService, RagService],
})
export class FaqModule {}
