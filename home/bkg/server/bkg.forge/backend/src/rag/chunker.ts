export type Chunk = { id: string; content: string; index: number };

const MAX_CHARS = 1200;
const OVERLAP = 120;

export function chunkText(text: string): Chunk[] {
  const normalized = text.replace(/\r\n/g, '\n').trim();
  const parts: Chunk[] = [];
  let cursor = 0;
  let index = 0;
  while (cursor < normalized.length) {
    const end = Math.min(cursor + MAX_CHARS, normalized.length);
    const chunk = normalized.slice(cursor, end);
    parts.push({ id: `${index}`, content: chunk, index });
    cursor = end - OVERLAP;
    index += 1;
  }
  return parts;
}

export function chunkMarkdown(markdown: string): Chunk[] {
  const sections = markdown.split(/\n#{1,6} /g);
  if (sections.length === 1) return chunkText(markdown);
  const chunks: Chunk[] = [];
  sections.forEach((section, idx) => {
    chunkText(section).forEach((chunk) => chunks.push({ ...chunk, id: `${idx}-${chunk.id}` }));
  });
  return chunks;
}

export function chunkCode(code: string): Chunk[] {
  const blocks = code.split(/\n{2,}/g);
  const chunks: Chunk[] = [];
  blocks.forEach((block, idx) => {
    const trimmed = block.trim();
    if (!trimmed) return;
    chunkText(trimmed).forEach((chunk) => chunks.push({ ...chunk, id: `${idx}-${chunk.id}` }));
  });
  return chunks;
}
