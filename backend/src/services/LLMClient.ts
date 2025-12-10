import fetch from 'node-fetch'
import { env } from '../config/env'

type Provider = 'lmstudio' | 'llamaedge' | 'ollama'

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface ChatResponse {
  provider: Provider
  content: string
  latencyMs: number
}

const routes: Record<Provider, string> = {
  lmstudio: `${env.lmstudioUrl}/v1/chat/completions`,
  llamaedge: `${env.llamaEdgeUrl}/v1/chat/completions`,
  ollama: `${env.ollamaUrl}/v1/chat/completions`
}

export class LLMClient {
  constructor(private readonly defaultProvider: Provider = 'lmstudio') {}

  async chat(messages: ChatMessage[], provider: Provider = this.defaultProvider): Promise<ChatResponse> {
    const url = routes[provider]
    const started = performance.now()
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: env.authToken ? `Bearer ${env.authToken}` : ''
      },
      body: JSON.stringify({ messages, stream: false })
    })

    if (!response.ok) {
      const text = await response.text()
      throw new Error(`LLM provider ${provider} failed: ${text}`)
    }

    const json = await response.json() as { choices: Array<{ message: { content: string } }> }
    const latencyMs = performance.now() - started
    const content = json.choices?.[0]?.message?.content ?? ''
    return { provider, content, latencyMs }
  }

  async embed(texts: string[]): Promise<number[][]> {
    const url = `${env.lmstudioUrl}/v1/embeddings`
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: texts })
    })
    if (!response.ok) {
      throw new Error(`Failed to create embeddings: ${response.statusText}`)
    }
    const json = await response.json() as { data: Array<{ embedding: number[] }> }
    return json.data.map((item) => item.embedding)
  }
}

export const llmClient = new LLMClient()
