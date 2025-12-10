import { useState } from 'react';

const steps = [
  'Projektidee erfassen',
  'Agenten-Kette konfigurieren',
  'Flowise Flow auswählen',
  'RAG Index initialisieren',
  'Simulation starten'
];

export default function Onboarding() {
  const [checked, setChecked] = useState<boolean[]>(Array(steps.length).fill(false));

  return (
    <div className="max-w-2xl mx-auto bg-slate/80 p-6 rounded-xl glow">
      <h1 className="text-3xl font-bold text-neon mb-4">Replit-Style Onboarding</h1>
      <p className="text-sm text-gray-300 mb-6">
        Folge den Schritten, um bkg.forge zu initialisieren. Jeder Schritt aktiviert die nächste Pipeline.
      </p>
      <ul className="space-y-3">
        {steps.map((s, idx) => (
          <li key={s} className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={checked[idx]}
              onChange={(e) => {
                const clone = [...checked];
                clone[idx] = e.target.checked;
                setChecked(clone);
              }}
              className="h-5 w-5 border-neon text-magenta focus:ring-magenta"
            />
            <span className={checked[idx] ? 'text-neon' : 'text-gray-400'}>{s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
