import fetch from 'node-fetch';
import { env } from '../config/env.js';

export class FlowiseClient {
  private readonly base = env.flowiseUrl;

  async chat(flowId: string, payload: Record<string, unknown>): Promise<unknown> {
    const response = await fetch(`${this.base}/api/v1/chat/${flowId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      throw new Error(`Flowise chat failed: ${response.status} ${await response.text()}`);
    }
    return response.json();
  }

  async executeFlow(flowId: string, inputs: Record<string, unknown>): Promise<unknown> {
    const response = await fetch(`${this.base}/api/v1/flows/${flowId}/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputs)
    });
    if (!response.ok) {
      throw new Error(`Flow execution failed: ${response.status} ${await response.text()}`);
    }
    return response.json();
  }

  async listFlows(): Promise<unknown> {
    const response = await fetch(`${this.base}/api/v1/flows`);
    if (!response.ok) throw new Error(`Flowise list failed: ${response.status}`);
    return response.json();
  }
}

export const flowiseClient = new FlowiseClient();
