import { Readable } from 'stream';

export type Chunk = {
  id: string;
  content: string;
  source: string;
  order: number;
};

export function chunkText(source: string, content: string, size = 800): Chunk[] {
  const sanitized = content.replace(/\s+/g, ' ').trim();
  const parts: Chunk[] = [];
  for (let i = 0; i < sanitized.length; i += size) {
    const slice = sanitized.slice(i, i + size);
    parts.push({
      id: `${source}-${i}`,
      content: slice,
      source,
      order: parts.length
    });
  }
  return parts;
}

export function streamChunks(source: string, readable: Readable, size = 1024): Promise<Chunk[]> {
  return new Promise((resolve, reject) => {
    let buffer = '';
    const chunks: Chunk[] = [];
    readable.on('data', (data) => {
      buffer += data.toString();
      if (buffer.length >= size) {
        const slice = buffer.slice(0, size);
        buffer = buffer.slice(size);
        chunks.push({ id: `${source}-${chunks.length}`, content: slice, source, order: chunks.length });
      }
    });
    readable.on('end', () => {
      if (buffer.length) {
        chunks.push({ id: `${source}-${chunks.length}`, content: buffer, source, order: chunks.length });
      }
      resolve(chunks);
    });
    readable.on('error', reject);
  });
}
