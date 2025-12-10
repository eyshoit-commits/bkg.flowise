import { useState } from 'react'
import axios from 'axios'

const Agents = () => {
  const [idea, setIdea] = useState('')
  const [plan, setPlan] = useState<string[]>([])

  const forge = async () => {
    const { data } = await axios.post('/api/agents/plan', { idea })
    setPlan(data.plan)
  }

  return (
    <div className="cyber-card p-4 glow-border">
      <h2 className="text-2xl mb-2">Multi-Agent Planner</h2>
      <div className="flex gap-2 mb-3">
        <input value={idea} onChange={(e) => setIdea(e.target.value)} className="flex-1 p-2 bg-black text-neon-cyan" placeholder="Describe your project" />
        <button onClick={forge} className="neon-button">Self-FORGE</button>
      </div>
      <ul className="space-y-1">
        {plan.map((step) => <li key={step}>• {step}</li>)}
      </ul>
    </div>
  )
}

export default Agents
