import axios, { AxiosInstance } from 'axios';
import { config } from '../config/env.js';

export class FlowiseClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({ baseURL: config.flowiseUrl, timeout: 10_000 });
  }

  async listFlows() {
    const { data } = await this.client.get('/api/v1/flows');
    return data;
  }

  async executeFlow(flowId: string, body: Record<string, unknown>) {
    const { data } = await this.client.post(`/api/v1/prediction/${flowId}`, body);
    return data;
  }

  async chat(flowId: string, message: string) {
    const { data } = await this.client.post(`/api/v1/chat/${flowId}`, { message });
    return data;
  }
}

export const flowiseClient = new FlowiseClient();
