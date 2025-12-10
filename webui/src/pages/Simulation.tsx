import { useState } from 'react'
import axios from 'axios'

const Simulation = () => {
  const [scenario, setScenario] = useState('stress-test')
  const [parameters, setParameters] = useState('{}')
  const [result, setResult] = useState<string>('')

  const run = async () => {
    const parsed = JSON.parse(parameters)
    const { data } = await axios.post('/api/sim', { scenario, parameters: parsed })
    setResult(JSON.stringify(data, null, 2))
  }

  return (
    <div className="cyber-card p-4 glow-border grid gap-2">
      <h2 className="text-2xl mb-2">SIMStudio Integration</h2>
      <input value={scenario} onChange={(e) => setScenario(e.target.value)} className="p-2 bg-black text-neon-cyan" />
      <textarea value={parameters} onChange={(e) => setParameters(e.target.value)} rows={6} className="p-2 bg-black text-neon-cyan"></textarea>
      <button onClick={run} className="neon-button">Run Simulation</button>
      <pre className="p-3 bg-black glow-border" aria-live="polite">{result}</pre>
    </div>
  )
}

export default Simulation
