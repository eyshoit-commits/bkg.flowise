import { useState } from 'react';
import axios from 'axios';

export default function Agents() {
  const [idea, setIdea] = useState('Lokale KI-IDE');
  const [plan, setPlan] = useState('');
  const [result, setResult] = useState('');

  const runPlan = async () => {
    const { data } = await axios.post('/api/agents/plan', { idea });
    setPlan(data.plan);
  };

  const runCode = async () => {
    const { data } = await axios.post('/api/agents/code', { plan });
    setResult(data.code);
  };

  const runReview = async () => {
    const { data } = await axios.post('/api/agents/review', { code: result });
    setResult(data.review);
  };

  return (
    <div className="space-y-4">
      <div className="bg-slate/80 p-4 rounded-lg">
        <h2 className="text-2xl text-neon">Multi-Agenten</h2>
        <textarea className="w-full bg-black/30 p-2 rounded" value={idea} onChange={(e) => setIdea(e.target.value)} />
        <div className="flex gap-2 mt-3">
          <button className="bg-neon/20 px-3 py-2 rounded" onClick={runPlan}>Plan</button>
          <button className="bg-magenta/30 px-3 py-2 rounded" onClick={runCode}>Code</button>
          <button className="bg-neon/30 px-3 py-2 rounded" onClick={runReview}>Review</button>
        </div>
      </div>
      <div className="bg-slate/80 p-4 rounded-lg">
        <h3 className="text-xl text-magenta">Plan</h3>
        <pre className="whitespace-pre-wrap text-sm">{plan}</pre>
        <h3 className="text-xl text-magenta mt-4">Ergebnis</h3>
        <pre className="whitespace-pre-wrap text-sm">{result}</pre>
      </div>
    </div>
  );
}
