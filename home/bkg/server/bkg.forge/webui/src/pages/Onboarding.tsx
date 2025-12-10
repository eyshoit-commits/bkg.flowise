import { useState } from 'react';
import clsx from 'clsx';

const steps = [
  { id: 'env', title: 'Environment', description: 'Prüfe lokale LLMs, Docker und Ports.' },
  { id: 'db', title: 'Database', description: 'Initialisiere PostgreSQL mit pgvector.' },
  { id: 'agents', title: 'Agents', description: 'Starte Planner, Coder, Reviewer.' },
  { id: 'flow', title: 'Flowise', description: 'Lade Standard-Flow und Chat-Embed.' }
];

export default function Onboarding() {
  const [completed, setCompleted] = useState<string[]>([]);
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl glow">Replit-Style Onboarding</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {steps.map((step) => (
          <label key={step.id} className="panel p-4 flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={completed.includes(step.id)}
              onChange={(e) =>
                setCompleted((prev) =>
                  e.target.checked ? [...prev, step.id] : prev.filter((id) => id !== step.id)
                )
              }
              className="mt-1 accent-neon-magenta"
            />
            <div>
              <p className="text-xl">{step.title}</p>
              <p className="text-sm opacity-80">{step.description}</p>
            </div>
          </label>
        ))}
      </div>
      <div className={clsx('p-4 panel', completed.length === steps.length ? 'border-neon-magenta' : '')}>
        {completed.length === steps.length ? (
          <p className="glow">System bereit. Starte Self-Forging.</p>
        ) : (
          <p className="opacity-80">Markiere alle Schritte, um fortzufahren.</p>
        )}
      </div>
    </div>
  );
}
