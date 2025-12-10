import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function saveEmbedding(projectId: string, title: string, chunk: string, vector: number[], meta: { source: string; chunkSize: number; overlap: number; model: string; encoder: string }): Promise<void> {
  await prisma.$transaction(async (tx) => {
    const document = await tx.ragDocument.create({
      data: {
        projectId,
        title,
        content: chunk,
        tokens: chunk.length,
        embedding: vector as unknown as object,
        metadata: {
          create: {
            source: meta.source,
            chunkSize: meta.chunkSize,
            overlap: meta.overlap,
            model: meta.model,
            encoder: meta.encoder
          }
        }
      }
    });
    await tx.agentLog.create({
      data: {
        agent: 'RAGIndexer',
        projectId,
        payload: { documentId: document.id, title }
      }
    });
  });
}

export async function searchSimilar(projectId: string, vector: number[], topK = 6): Promise<{ id: string; content: string; score: number }[]> {
  const vectorSql = `ARRAY[${vector.join(',')}]::vector`;
  const results = await prisma.$queryRawUnsafe<Array<{ id: string; content: string; similarity: number }>>(`
    SELECT "id", "content", 1 - ("embedding" <=> ${vectorSql}) as similarity
    FROM "RagDocument"
    WHERE "projectId" = $1
    ORDER BY "embedding" <=> ${vectorSql}
    LIMIT ${topK}
  `, projectId);
  return results.map((row) => ({ id: row.id, content: row.content, score: Number(row.similarity) }));
}

export async function recordQuery(projectId: string, query: string, response: string, similarity: number, documentId?: string): Promise<void> {
  await prisma.ragQuery.create({
    data: { projectId, query, response, similarity, documentId }
  });
}

export { prisma };
