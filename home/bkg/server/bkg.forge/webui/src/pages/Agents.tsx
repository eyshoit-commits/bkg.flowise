import { useState } from 'react';
import axios from 'axios';

export default function Agents() {
  const [idea, setIdea] = useState('Lokale AI-Schmiede bauen');
  const [plan, setPlan] = useState<string>('');

  const runPlanner = async () => {
    const response = await axios.post('/api/agents/plan', { idea, model: 'forge-planner' });
    setPlan(JSON.stringify(response.data.plan, null, 2));
  };

  return (
    <div className="p-6 grid grid-cols-2 gap-4">
      <div className="panel p-4 space-y-3">
        <h2 className="text-2xl glow">Planner Agent</h2>
        <textarea
          className="w-full h-32 bg-black border border-neon-cyan p-2"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
        />
        <button className="button-neon" onClick={runPlanner}>Plan erzeugen</button>
      </div>
      <div className="panel p-4">
        <pre className="whitespace-pre-wrap text-sm">{plan || 'Noch kein Plan generiert.'}</pre>
      </div>
    </div>
  );
}
