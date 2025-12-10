import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { chunkMarkdown, chunkText, chunkCode } from './chunker.js';
import { embedText } from './vector.js';
import { saveEmbedding } from './store.js';

export type IndexerConfig = {
  projectId: string;
  provider: 'lmstudio' | 'llamaedge' | 'ollama';
  model: string;
  root: string;
};

function selectChunker(filePath: string) {
  if (filePath.endsWith('.md') || filePath.endsWith('.markdown')) return chunkMarkdown;
  if (filePath.endsWith('.ts') || filePath.endsWith('.tsx') || filePath.endsWith('.js') || filePath.endsWith('.jsx')) return chunkCode;
  return chunkText;
}

export class Indexer {
  constructor(private readonly cfg: IndexerConfig) {}

  private checksum(content: string): string {
    return crypto.createHash('sha256').update(content).digest('hex');
  }

  async indexFile(filePath: string): Promise<void> {
    const content = await fs.promises.readFile(filePath, 'utf-8');
    const hash = this.checksum(content);
    const chunker = selectChunker(filePath);
    const chunks = chunker(content);
    for (const chunk of chunks) {
      const embedding = await embedText(this.cfg.provider, this.cfg.model, chunk.content);
      await saveEmbedding(this.cfg.projectId, path.basename(filePath), chunk.content, embedding, {
        source: path.relative(this.cfg.root, filePath),
        chunkSize: chunk.content.length,
        overlap: 120,
        model: this.cfg.model,
        encoder: this.cfg.provider
      });
    }
    const metaPath = `${filePath}.forge.meta.json`;
    await fs.promises.writeFile(metaPath, JSON.stringify({ hash, indexedAt: new Date().toISOString() }, null, 2));
  }

  async indexDirectory(): Promise<void> {
    const entries = await fs.promises.readdir(this.cfg.root, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(this.cfg.root, entry.name);
      if (entry.isDirectory()) {
        const nested = new Indexer({ ...this.cfg, root: full });
        await nested.indexDirectory();
      } else if (entry.isFile() && !entry.name.endsWith('.forge.meta.json')) {
        await this.indexFile(full);
      }
    }
  }
}
