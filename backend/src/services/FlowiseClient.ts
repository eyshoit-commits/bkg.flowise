import fetch from 'node-fetch'
import { env } from '../config/env'

export interface FlowExecutionRequest {
  flowId: string
  inputs: Record<string, unknown>
  overrides?: Record<string, unknown>
}

export class FlowiseClient {
  private headers = {
    'Content-Type': 'application/json',
    Authorization: env.authToken ? `Bearer ${env.authToken}` : ''
  }

  async listFlows(): Promise<unknown[]> {
    const res = await fetch(`${env.flowiseUrl}/api/v1/flows`, { headers: this.headers })
    if (!res.ok) throw new Error('Unable to fetch flows')
    return await res.json() as unknown[]
  }

  async executeFlow(payload: FlowExecutionRequest): Promise<unknown> {
    const res = await fetch(`${env.flowiseUrl}/api/v1/flows/${payload.flowId}/run`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ inputs: payload.inputs, overrides: payload.overrides ?? {} })
    })
    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Flow execution failed: ${text}`)
    }
    return await res.json()
  }

  async chat(message: string, sessionId: string): Promise<unknown> {
    const res = await fetch(`${env.flowiseUrl}/api/v1/prediction/${sessionId}`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ query: message })
    })
    if (!res.ok) {
      throw new Error(`Flowise chat failed: ${res.statusText}`)
    }
    return await res.json()
  }
}

export const flowiseClient = new FlowiseClient()
