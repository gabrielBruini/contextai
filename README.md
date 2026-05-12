# ContextAI

AI-powered semantic FAQ system using:

- NestJS
- PostgreSQL
- pgvector
- Ollama
- Embeddings
- Semantic Search
- RAG (Retrieval-Augmented Generation)

The project stores FAQ questions and answers as embeddings and uses vector similarity search to retrieve the most relevant information before generating a final response with an LLM.

---

# Features

- Semantic FAQ search
- Vector similarity with pgvector
- Embedding generation using Ollama
- RAG pipeline
- PostgreSQL vector database
- NestJS architecture
- Prisma ORM
- Local LLM support
- Low hallucination responses

---

# Architecture

```text
User Question
      ↓
Embedding Generation
      ↓
Vector Similarity Search
      ↓
Relevant FAQ Retrieval
      ↓
LLM Context Injection
      ↓
Final AI Response
```

---

# Tech Stack

- NestJS
- TypeScript
- PostgreSQL
- pgvector
- Prisma
- Ollama
- phi3
- nomic-embed-text

---

# Database Schema

```sql
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE faq (
  id UUID PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  embedding vector(768)
);
```

---

# Prisma Schema

```prisma
model Faq {
  id        String   @id @db.Uuid
  question  String
  answer    String
  embedding Unsupported("vector(768)")

  @@map("faq")
}
```

---

# How It Works

## 1. FAQ Creation

When a FAQ is created:

- the question is converted into embeddings
- the embedding vector is stored in PostgreSQL

Example:

```json
{
  "question": "What are your business hours?",
  "answer": "We are open from 8AM to 6PM."
}
```

---

## 2. User Question

When the user asks something:

```json
{
  "question": "What time do you open?"
}
```

The system:

1. Generates embeddings for the user question
2. Searches similar questions using pgvector
3. Retrieves the most relevant FAQs
4. Sends context to the LLM
5. Generates the final answer

## Clone repository

```bash
git clone https://github.com/your-username/context-ai.git
```

## Install dependencies

```bash
npm install
```

---

# Setup PostgreSQL + pgvector

Enable extension:

```sql
CREATE EXTENSION vector;
```

---

# Setup Ollama

Install Ollama:

https://ollama.com

Pull required models:

```bash
ollama pull phi3
ollama pull nomic-embed-text
```

---

# Running the Project

```bash
npm run start:dev
```

---

# API Endpoints

## Create FAQ

```http
POST /faq
```

Body:

```json
{
  "question": "What are your business hours?",
  "answer": "We are open from 8AM to 6PM."
}
```

---

## Ask AI

```http
POST /faq/ask
```

Body:

```json
{
  "question": "What time do you open?"
}
```

Example response:

```json
{
  "answer": "We are open from 8AM to 6PM.",
  "sources": [
    {
      "question": "What are your business hours?",
      "similarity": 0.91
    }
  ]
}
```

---

# Similarity Search

The project uses cosine similarity:

```sql
embedding <=> query_embedding
```

The lower the distance, the more semantically similar the content is.

---

# Future Improvements

- Hybrid Search
- Metadata filtering
- Chat history memory
- Multi-tenant support
- Streaming responses
- Re-ranking
- Admin dashboard
- Redis caching

---

# Why This Project?

This project was built to explore:

- AI Engineering
- Retrieval-Augmented Generation (RAG)
- Vector Databases
- Semantic Search
- Embedding Pipelines
- LLM Integration
- AI-powered backend systems

---
