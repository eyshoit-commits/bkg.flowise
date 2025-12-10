import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Simulation() {
  const [simulations, setSimulations] = useState<any[]>([]);
  const [result, setResult] = useState('');

  useEffect(() => {
    axios
      .get('/api/sim')
      .then((res) => setSimulations(res.data as any[]))
      .catch(() => setSimulations([]));
  }, []);

  const run = async (id: string) => {
    const response = await axios.post(`/api/sim/${id}/run`, { steps: 4 });
    setResult(JSON.stringify(response.data, null, 2));
  };

  return (
    <div className="p-6 grid grid-cols-2 gap-4">
      <div className="panel p-4 space-y-3">
        <h2 className="text-2xl glow">SIMStudio Szenarien</h2>
        {simulations.map((sim) => (
          <button key={sim.id} className="button-neon w-full text-left" onClick={() => run(sim.id)}>
            {sim.name || sim.id}
          </button>
        ))}
        {simulations.length === 0 && <p className="opacity-75">Keine Simulationen geladen.</p>}
      </div>
      <div className="panel p-4">
        <pre className="whitespace-pre-wrap text-sm">{result || 'Starte eine Simulation.'}</pre>
      </div>
    </div>
  );
}
