import fetch, { Headers } from 'node-fetch';
import { env } from '../config/env.js';

export type ChatMessage = { role: 'user' | 'assistant' | 'system'; content: string };
export type ChatProvider = 'lmstudio' | 'llamaedge' | 'ollama';

export class LLMClient {
  private readonly headers: Headers;

  constructor(private readonly provider: ChatProvider) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    if (env.openaiKey) {
      this.headers.set('Authorization', `Bearer ${env.openaiKey}`);
    }
  }

  private providerUrl(): string {
    switch (this.provider) {
      case 'lmstudio':
        return env.lmStudioUrl;
      case 'llamaedge':
        return env.llamaEdgeUrl;
      case 'ollama':
        return env.ollamaUrl;
      default:
        return env.lmStudioUrl;
    }
  }

  async chat(model: string, messages: ChatMessage[], temperature = 0.2): Promise<string> {
    const url = `${this.providerUrl()}/v1/chat/completions`;
    const response = await fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        model,
        messages,
        temperature,
        stream: false
      })
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Chat completion failed: ${response.status} ${text}`);
    }

    const data = await response.json();
    const choice = data.choices?.[0]?.message?.content;
    if (!choice) throw new Error('No completion returned');
    return choice as string;
  }

  async embed(model: string, input: string): Promise<number[]> {
    const url = `${this.providerUrl()}/v1/embeddings`;
    const response = await fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ model, input })
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Embedding failed: ${response.status} ${text}`);
    }
    const data = await response.json();
    const vector = data.data?.[0]?.embedding;
    if (!Array.isArray(vector)) {
      throw new Error('No embedding returned');
    }
    return vector as number[];
  }
}

export const createLLMClient = (provider: ChatProvider) => new LLMClient(provider);
