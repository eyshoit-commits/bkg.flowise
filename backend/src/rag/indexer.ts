import fs from 'fs';
import path from 'path';
import chokidar from 'chokidar';
import { chunkText } from './chunker.js';
import { indexChunks } from './store.js';

export type IndexJob = { root: string; glob: string[] };

export async function indexFile(filePath: string) {
  const content = await fs.promises.readFile(filePath, 'utf-8');
  const chunks = chunkText(filePath, content);
  await indexChunks(chunks);
}

export function watchAndIndex(job: IndexJob) {
  const watcher = chokidar.watch(job.glob, { cwd: job.root, ignoreInitial: false });
  watcher.on('add', (file) => indexFile(path.join(job.root, file)));
  watcher.on('change', (file) => indexFile(path.join(job.root, file)));
  return watcher;
}
