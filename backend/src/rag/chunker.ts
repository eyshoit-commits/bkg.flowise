export interface Chunk {
  id: string
  content: string
  source: string
  order: number
}

export const chunkMarkdown = (text: string, source: string, maxLen = 800): Chunk[] => {
  const sections = text.split(/\n#+\s/)
  return assembleChunks(sections, source, maxLen)
}

export const chunkCode = (text: string, source: string, maxLen = 400): Chunk[] => {
  const lines = text.split('\n')
  const buckets: string[] = []
  let current: string[] = []
  for (const line of lines) {
    current.push(line)
    if (current.join('\n').length > maxLen) {
      buckets.push(current.join('\n'))
      current = []
    }
  }
  if (current.length) buckets.push(current.join('\n'))
  return assembleChunks(buckets, source, maxLen)
}

export const chunkPlainText = (text: string, source: string, maxLen = 600): Chunk[] => {
  const paragraphs = text.split(/\n{2,}/)
  return assembleChunks(paragraphs, source, maxLen)
}

const assembleChunks = (segments: string[], source: string, maxLen: number): Chunk[] => {
  const chunks: Chunk[] = []
  let idx = 0
  for (const segment of segments) {
    const trimmed = segment.trim()
    if (!trimmed) continue
    const pieces = trimmed.match(new RegExp(`.{1,${maxLen}}`, 'g')) ?? []
    for (const piece of pieces) {
      chunks.push({ id: `${source}-${idx}`, content: piece, source, order: idx })
      idx += 1
    }
  }
  return chunks
}
