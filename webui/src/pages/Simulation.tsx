import { useState } from 'react';
import axios from 'axios';

export default function Simulation() {
  const [scenario, setScenario] = useState('supply-chain');
  const [parameters, setParameters] = useState('{ "iterations": 3 }');
  const [result, setResult] = useState('');

  const run = async () => {
    const { data } = await axios.post('/api/sim/run', {
      scenario,
      parameters: JSON.parse(parameters)
    });
    setResult(JSON.stringify(data, null, 2));
  };

  return (
    <div className="bg-slate/80 p-6 rounded-xl">
      <h2 className="text-2xl text-neon mb-4">SIMStudio</h2>
      <div className="flex flex-col gap-3">
        <input className="bg-black/30 p-2 rounded" value={scenario} onChange={(e) => setScenario(e.target.value)} />
        <textarea className="bg-black/30 p-2 rounded" value={parameters} onChange={(e) => setParameters(e.target.value)} />
        <button className="bg-magenta/40 px-3 py-2 rounded" onClick={run}>Simulation starten</button>
        <pre className="whitespace-pre-wrap text-sm">{result}</pre>
      </div>
    </div>
  );
}
