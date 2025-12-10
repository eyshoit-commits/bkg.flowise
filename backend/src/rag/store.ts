import { prisma } from '../services/prismaClient'
import { Chunk } from './chunker'

export interface StoredVector {
  id: string
  content: string
  vector: number[]
  metadata: Record<string, unknown>
}

export const storeVectors = async (chunks: Chunk[], embeddings: number[][], metadata: Record<string, unknown>): Promise<void> => {
  const data = chunks.map((chunk, idx) => ({
    id: chunk.id,
    content: chunk.content,
    embedding: embeddings[idx],
    metadata
  }))
  await prisma.embeddingMetadata.createMany({
    data: data.map((item) => ({ id: item.id, meta: item.metadata })),
    skipDuplicates: true
  })
  for (const item of data) {
    await prisma.ragDocument.upsert({
      where: { id: item.id },
      create: { id: item.id, content: item.content, embedding: item.embedding },
      update: { content: item.content, embedding: item.embedding }
    })
  }
}

export const searchVectors = async (embedding: number[], limit = 5): Promise<StoredVector[]> => {
  const rows = await prisma.$queryRaw<{ id: string, content: string, similarity: number }[]>`
    SELECT id, content, 1 - (embedding <=> ${embedding}::vector) as similarity
    FROM "RagDocument"
    ORDER BY embedding <=> ${embedding}::vector
    LIMIT ${limit}
  `
  const ids = rows.map((r) => r.id)
  const metadata = await prisma.embeddingMetadata.findMany({ where: { id: { in: ids } } })
  return rows.map((row) => ({
    id: row.id,
    content: row.content,
    vector: embedding,
    metadata: metadata.find((m) => m.id === row.id)?.meta ?? {},
    similarity: row.similarity
  })) as StoredVector[]
}
