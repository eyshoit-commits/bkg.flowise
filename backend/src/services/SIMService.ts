import axios from 'axios';
import { config } from '../config/env.js';

export class SIMService {
  async runScenario(scenario: string, parameters: Record<string, unknown>) {
    const { data } = await axios.post(`${config.simUrl}/simulate`, { scenario, parameters });
    return data;
  }
}

export const simService = new SIMService();
