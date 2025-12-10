import axios from 'axios';
import crypto from 'crypto';
import { config } from '../config/env.js';

type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string };

export class LLMClient {
  async chat(messages: ChatMessage[]): Promise<string> {
    try {
      const { data } = await axios.post(
        `${config.lmStudioUrl}/v1/chat/completions`,
        { messages, temperature: 0.2, max_tokens: 400 },
        { timeout: 12_000 }
      );
      return data.choices?.[0]?.message?.content ?? 'Kein Inhalt aus LMStudio';
    } catch (error) {
      return this.localFallback(messages);
    }
  }

  async embedding(text: string): Promise<number[]> {
    try {
      const { data } = await axios.post(
        `${config.lmStudioUrl}/v1/embeddings`,
        { input: text }
      );
      const vec = data.data?.[0]?.embedding as number[] | undefined;
      if (vec && Array.isArray(vec)) return vec;
      return this.syntheticVector(text);
    } catch (error) {
      return this.syntheticVector(text);
    }
  }

  private syntheticVector(input: string): number[] {
    const hash = crypto.createHash('sha256').update(input).digest();
    const floats: number[] = [];
    for (let i = 0; i < hash.length; i += 4) {
      const segment = hash.readUInt32BE(i % (hash.length - 4));
      floats.push((segment % 1000) / 1000);
    }
    return floats;
  }

  private localFallback(messages: ChatMessage[]): string {
    const prompt = messages.map((m) => `${m.role}: ${m.content}`).join('\n');
    return `Local offline responder. Received: ${prompt}`;
  }
}

export const llmClient = new LLMClient();
