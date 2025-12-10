import fetch from 'node-fetch';
import { env } from '../config/env.js';

export class SIMService {
  async list(): Promise<unknown> {
    const response = await fetch(`${env.simStudioUrl}/api/simulations`);
    if (!response.ok) throw new Error(`SIMStudio list failed: ${response.status}`);
    return response.json();
  }

  async run(simulationId: string, payload: Record<string, unknown>): Promise<unknown> {
    const response = await fetch(`${env.simStudioUrl}/api/simulations/${simulationId}/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(`SIMStudio run failed: ${response.status}`);
    return response.json();
  }
}

export const simService = new SIMService();
