import { Controller, Post, Body } from '@nestjs/common';
import { RagService } from '../rag/rag.service';
import { FaqService } from './faq.service';

@Controller('faq')
export class FaqController {
  constructor(
    private readonly ragService: RagService,
    private readonly faqService: FaqService,
  ) {}

  @Post('/ask')
  ask(
    @Body('question')
    question: string,
  ) {
    return this.ragService.ask(question);
  }

  @Post()
  async create(
    @Body()
    body: {
      question: string;
      answer: string;
    },
  ) {
    await this.faqService.create(body.question, body.answer);

    return {
      success: true,
    };
  }
}
