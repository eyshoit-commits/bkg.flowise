import fs from 'fs'
import path from 'path'
import { chunkMarkdown, chunkCode, chunkPlainText } from './chunker'
import { llmClient } from '../services/LLMClient'
import { storeVectors } from './store'

const codeExtensions = ['.ts', '.tsx', '.js', '.jsx', '.py']

export const indexFile = async (filePath: string): Promise<void> => {
  const content = fs.readFileSync(filePath, 'utf-8')
  const ext = path.extname(filePath)
  const base = path.basename(filePath)
  const chunks = codeExtensions.includes(ext)
    ? chunkCode(content, base)
    : ext === '.md'
      ? chunkMarkdown(content, base)
      : chunkPlainText(content, base)
  const embeddings = await llmClient.embed(chunks.map((c) => c.content))
  await storeVectors(chunks, embeddings, { file: base, path: filePath })
}

export const indexDirectory = async (dir: string): Promise<void> => {
  const entries = fs.readdirSync(dir)
  for (const entry of entries) {
    const full = path.join(dir, entry)
    const stat = fs.statSync(full)
    if (stat.isDirectory()) {
      await indexDirectory(full)
    } else {
      await indexFile(full)
    }
  }
}
