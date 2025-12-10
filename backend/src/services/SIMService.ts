import fetch from 'node-fetch'
import { env } from '../config/env'

export interface SimulationRequest {
  scenario: string
  parameters: Record<string, unknown>
}

export class SIMService {
  async runSimulation(request: SimulationRequest): Promise<unknown> {
    const res = await fetch(`${env.simStudioUrl}/api/sim`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    })
    if (!res.ok) {
      throw new Error(`Simulation failed: ${res.statusText}`)
    }
    return await res.json()
  }
}

export const simService = new SIMService()
